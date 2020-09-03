import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import mongoose from "mongoose"
import { BrokerAccount, BrokerInvestiment } from '../../Broker/models'
import { Account } from '../../Identity/models'

class Application {

    @prop({ ref: BrokerInvestiment, required: true })
    investiment!: Ref<BrokerInvestiment>
    
    @prop({ required: true })
    amount: number
    
    @prop()
    refId?: mongoose.Types.ObjectId
}

export class InvestimentAccount {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    @prop({ ref: BrokerAccount, required: true })
    brokerAccount!: Ref<BrokerAccount>

    @prop({ _id: false })
    applications: Application[]
    
    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date
}

export const InvestimentAccountModel = getModelForClass(InvestimentAccount, {
    schemaOptions: {
        collection: "investiment-accounts"
    }
})