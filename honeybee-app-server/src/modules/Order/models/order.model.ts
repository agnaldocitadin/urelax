import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose from 'mongoose'
import { Account } from '../../Identity/models/profile.model'

export enum OrderPlatforms {
    SWINGTRADE = "SWINGTRADE",
    DAYTRADE = "DAYTRADE"
}

export enum OrderTypes {
    LIMIT = "LIMIT",
    STOP = "STOP"
}

export enum OrderSides {
    BUY = "BUY",
    SELL = "SELL"
}

export enum OrderStatus {
    NEW = "NEW",
	OPEN = "OPEN",
    FILLED = "FILLED",
    PARTIAL_FILLED = "PARTIAL_FILLED",
    REJECTED = "REJECTED"
}

class Execution {
    
    @prop({ required: true })
    priceExecuted!: number

    @prop({ required: true })
    quantityExecuted!: number
}

class StockInfo {

    @prop({ required: true })
    symbol!: string
    
    @prop({ required: true, enum: OrderTypes })
    type!: string
    
    @prop({ required: true })
    expiresAt!: Date
}

/**
 * OK
 * - Ordem será o mesmo modelo para todos os tipos (renda variável, fixa, etc)
 * - Conforme o tipo de ordem criado, será instanciado o executor da ordem
 *
 * @export
 * @class Order
 * @extends {Typegoose}
 */
export class Order {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    @prop({ required: true, default: 0 })
    progress!: number

    @prop({ required: true, enum: OrderStatus })
    status!: string

    @prop()
    orderBrokerId?: string

    @prop({ required: true, default: 0 })
    price!: number

    @prop({ required: true, default: 0 })
    quantity!: number

    @prop({ required: true, enum: OrderPlatforms })
    platform!: string

    @prop({ required: true, enum: OrderSides })
    side!: string

    @prop()
    message?: string
    
    @arrayProp({ _id: false, items: Execution })
    executions?: Execution[]

    @prop({ _id: false })
    stock?: StockInfo

    // Add here the others kind of investiments

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date

    public isBuy?(): boolean {
        return this.side === OrderSides.BUY
    }

    public isSell?(): boolean {
        return this.side === OrderSides.SELL
    }
    
    public addExecution?(execution: Execution, progress: number) {
        if (!this.executions) this.executions = []
        this.executions = [...this.executions, execution]
        this.progress = progress
    }

    public isSellOrderNotRejected?(): boolean {
        return this.side === OrderSides.SELL && this.status !== OrderStatus.REJECTED
    }
    
    public isSellOrderRejected?(): boolean {
        return this.side === OrderSides.SELL && this.status === OrderStatus.REJECTED
    }
    
    public isBuyOrderNotRejected?(): boolean {
        return this.side === OrderSides.BUY && this.status !== OrderStatus.REJECTED
    }
    
    public isBuyOrderRejected?(): boolean {
        return this.side === OrderSides.BUY && this.status === OrderStatus.REJECTED
    }

    public getQuantityExecuted?(): number {
        return this.executions.map(execution => execution.quantityExecuted).reduce((a, b) => a + b, 0)
    }

    public getExecutedPriceAverage?(): number {
        let prices = this.executions.map(execution => execution.priceExecuted).reduce((a, b) => a + b, 0)
        return prices / this.executions.length
    }

    public getTotalOrder?(): number {
        return this.executions.reduce((total, execution) => total + (execution.quantityExecuted * execution.priceExecuted), 0)
    }

}

export const OrderModel = getModelForClass(Order, {
    schemaOptions: {
        collection: "orders"
    }
})