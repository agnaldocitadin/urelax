import { prop, Ref, Typegoose } from '@hasezoey/typegoose'
import mongoose from "mongoose"
import { Brokers } from './types.d'
import { UserAccount } from './user.account.model'

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

    @prop({ ref: UserAccount, required: true })
    userAccount!: Ref<UserAccount>

    @prop({ required: true })
    accountName!: string

    @prop({ default: 0.0 })
    initialAmount: number

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