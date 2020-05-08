import { prop, Ref, Typegoose } from '@hasezoey/typegoose'
import { Brokers } from 'honeybee-api'
import mongoose from 'mongoose'
import { Account } from './account.model'

export type BrokerAccountExtraData = {
    token: string
    signature: string
    platformUID: string
    sessionId: string
    cpf: string
    passwd: string
    birthdate: Date
}

/**
 *
 *
 * @export
 * @class Broker
 * @extends {Typegoose}
 */
export class BrokerAccount extends Typegoose {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    @prop({ required: true })
    accountName!: string

    @prop({ required: true, enum: Brokers })
    brokerCode!: string

    @prop()
    extraData!: BrokerAccountExtraData
    
    @prop({ default: () => new Date() })
    createdAt?: Date
}

export const BrokerAccountModel = new BrokerAccount().getModelForClass(BrokerAccount, {
    schemaOptions: {
        collection: "broker-accounts"
    }
})