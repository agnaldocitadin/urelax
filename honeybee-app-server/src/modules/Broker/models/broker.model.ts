import { getModelForClass, prop } from '@typegoose/typegoose'
import { Brokers } from 'honeybee-api'
import mongoose from "mongoose"

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

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date
}

export const BrokerModel = getModelForClass(Broker, {
    schemaOptions: {
        collection: "brokers"
    }
})