import { prop, Typegoose } from '@hasezoey/typegoose'
import mongoose from "mongoose"
import { Brokers } from './types.d'

/**
 *
 *
 * @export
 * @class Broker
 * @extends {Typegoose}
 */
export class Broker extends Typegoose {

    _id?: mongoose.Types.ObjectId
    
    @prop({ unique: true, required: true, enum: Brokers })
    code!: string

    @prop({ required: true })
    name!: string

    @prop({ required: true })
    logo!: string

    @prop({ required: true })
    active!: boolean
}

export const BrokerModel = new Broker().getModelForClass(Broker, {
    schemaOptions: {
        collection: "brokers"
    }
})