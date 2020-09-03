import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { BrokerAccountInput, Brokers } from 'honeybee-api'
import mongoose from 'mongoose'
import { Account } from '../../Identity/models'

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
    password?: string

    @prop()
    birthdate?: Date
}

/**
 *
 *
 * @export
 * @class BrokerAccount
 * @extends {TimeStamps}
 */
export class BrokerAccount {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    @prop({ required: true })
    accountName!: string

    @prop({ required: true, enum: Brokers })
    brokerCode!: string

    @prop({ required: true, _id: false })
    extraData!: BrokerAccountExtraData

    @prop({ required: true })
    simulation!: boolean

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date

    public static from(input: BrokerAccountInput): BrokerAccount {
        return {
            account: mongoose.Types.ObjectId(input.account as string),
            accountName: input.accountName,
            brokerCode: input.brokerCode,
            extraData: input.extraData,
            simulation: false
        }
    }

}

export const BrokerAccountModel = getModelForClass(BrokerAccount, {
    schemaOptions: {
        collection: "broker-accounts"
    }
})