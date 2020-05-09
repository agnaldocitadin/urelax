import { arrayProp, getModelForClass, prop } from '@typegoose/typegoose'
import { Brokers } from 'honeybee-api'
import mongoose from "mongoose"

export enum InvestimentType {
    STOCK = "STOCK"
}

export class StockInfo {
    
    @prop({ required: true })
    symbol!: string

    @prop({ required: true })
    stockLot!: number
}

export class Investiment {
    
    _id?: mongoose.Types.ObjectId

    @prop({ required: true, enum: InvestimentType })
    type!: string
    
    @prop({ required: true })
    description!: string

    @prop({ required: true })
    active!: boolean

    @prop({ required: true })
    logo!: string

    @prop({ _id: false })
    stock?: StockInfo
    
}

/**
 * - Dados de corretoras que operam ações, índice, dollar, bitcoin, etc.
 * - Necessita de implementação em plugins para cada corretora
 *
 * @export
 * @class Broker
 * @extends {Typegoose}
 */
export class Broker {

    _id?: mongoose.Types.ObjectId
    
    @prop({ unique: true, required: true, enum: Brokers })
    code!: string

    @prop({ required: true })
    name!: string

    @prop({ required: true })
    logo!: string

    @prop({ required: true })
    active!: boolean

    @arrayProp({ items: Investiment })
    investiments?: Investiment[]

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date
}

export const BrokerModel = getModelForClass(Broker, {
    schemaOptions: {
        collection: "brokers-test"
    }
})