import { arrayProp, getModelForClass, prop } from '@typegoose/typegoose'
import { Brokers } from 'honeybee-api'
import mongoose from "mongoose"

enum InvestimentType {

}

class StockInfo {
    
    @prop({ required: true })
    symbol: string

    @prop({ required: true })
    stockLot: number
}

class Investiment {
    
    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    type!: InvestimentType
    
    @prop({ required: true })
    description!: string

    @prop({ required: true })
    active!: Boolean

    @prop({ required: true })
    logo!: string

    // ---- Stock -----
    @prop()
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
class Broker {

    _id?: mongoose.Types.ObjectId
    
    @prop({ unique: true, required: true, enum: Brokers })
    code!: string

    @prop({ required: true })
    name!: string

    @prop({ required: true })
    logo!: string

    @prop({ required: true })
    active!: boolean

    @arrayProp({ items: Investiment, default: [] })
    investiments: Investiment[]
}

export const BrokerModel = getModelForClass(Broker, {
    schemaOptions: {
        collection: "brokers-test"
    }
})