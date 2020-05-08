import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { Brokers } from 'honeybee-api'
import mongoose from 'mongoose'
import { Account } from './account.model'

/**
 *
 *
 * @export
 * @class BrokerAccount
 * @extends {TimeStamps}
 */
export class BrokerAccount extends TimeStamps {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: "Account", required: true })
    account!: Ref<Account>

    @prop({ required: true })
    accountName!: string

    @prop({ required: true, enum: Brokers })
    brokerCode!: string

    @prop()
    extraData!: BrokerAccountExtraData

}

class BrokerAccountExtraData {

    @prop()
    token?: string

    @prop()
    signature?: string

    @prop()
    platformUID?: string

    @prop()
    sessionId?: string

    @prop()
    cpf?: string

    @prop()
    passwd?: string

    @prop()
    birthdate?: Date
}

export const BrokerAccountModel = getModelForClass(BrokerAccount, {
    schemaOptions: {
        collection: "broker-accounts-test"
    }
})