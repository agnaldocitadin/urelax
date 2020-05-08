import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import mongoose from 'mongoose'
import { Account } from './account.model'

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

/**
 * OK
 * - Ordem será o mesmo modelo para todos os tipos (renda variável, fixa, etc)
 * - Conforme o tipo de ordem criado, será instanciado o executor da ordem
 *
 * @export
 * @class Order
 * @extends {Typegoose}
 */
export class Order extends TimeStamps {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: "Account", required: true })
    account!: Ref<Account>

    @prop({ required: true, default: 0 })
    progress!: number

    @prop({ required: true, enum: OrderStatus })
    status!: OrderStatus

    @prop()
    orderBrokerId?: string

    @prop({ required: true, default: 0 })
    price!: number

    @prop({ required: true, default: 0 })
    quantity!: number

    @prop({ required: true, enum: OrderPlatforms })
    platform!: OrderPlatforms

    @prop({ required: true, enum: OrderSides })
    side!: OrderSides

    @prop()
    message?: string
    
    @arrayProp({ items: "Execution" })
    executions?: Execution[]

    // ----- Stock specific attributes -------
    @prop()
    stock?: StockInfo

    // @instanceMethod
    public isBuy(): boolean {
        return this.side === OrderSides.BUY
    }

    // @instanceMethod
    public isSell(): boolean {
        return this.side === OrderSides.SELL
    }
    
    // @instanceMethod
    public addExecution(execution: Execution, progress: number) {
        if (!this.executions) this.executions = []
        this.executions = [...this.executions, execution]
        this.progress = progress
    }

    // @instanceMethod
    public isSellOrderNotRejected(): boolean {
        return this.side === OrderSides.SELL && this.status !== OrderStatus.REJECTED
    }
    
    // @instanceMethod
    public isSellOrderRejected(): boolean {
        return this.side === OrderSides.SELL && this.status === OrderStatus.REJECTED
    }
    
    // @instanceMethod
    public isBuyOrderNotRejected(): boolean {
        return this.side === OrderSides.BUY && this.status !== OrderStatus.REJECTED
    }
    
    // @instanceMethod
    public isBuyOrderRejected(): boolean {
        return this.side === OrderSides.BUY && this.status === OrderStatus.REJECTED
    }

    // @instanceMethod
    public getQuantityExecuted(): number {
        return this.executions.map(execution => execution.quantityExecuted).reduce((a, b) => a + b, 0)
    }

    // @instanceMethod
    public getExecutedPriceAverage(): number {
        let prices = this.executions.map(execution => execution.priceExecuted).reduce((a, b) => a + b, 0)
        return prices / this.executions.length
    }

    // @instanceMethod
    public getTotalOrder(): number {
        return this.executions.reduce((total, execution) => total + (execution.quantityExecuted * execution.priceExecuted), 0)
    }

}

class Execution {
    
    @prop({ required: true })
    priceExecuted: number

    @prop({ required: true })
    quantityExecuted: number
}

class StockInfo {

    @prop({ required: true })
    symbol: string
    
    @prop({ required: true })
    type: string
    
    @prop({ required: true })
    expiresAt: Date
}

export const OrderModel = getModelForClass(Order, {
    schemaOptions: {
        collection: "orders-test"
    }
})