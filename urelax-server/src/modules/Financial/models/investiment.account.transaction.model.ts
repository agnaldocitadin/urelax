import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TransactionType } from 'urelax-api'
import { BrokerInvestiment } from '../../Broker/models'
import { InvestimentAccount } from './investiment.account.model'

export class InvestimentAccountTransaction {

    @prop({ ref: InvestimentAccount, required: true })
    investimentAccount!: Ref<InvestimentAccount>

    @prop({ ref: BrokerInvestiment, required: true })
    investiment!: Ref<BrokerInvestiment>
    
    @prop({ required: true })
    dateTime!: Date

    @prop({ required: true, enum: TransactionType })
    type!: string

    @prop({ required: true })
    value!: number
    
}

export const InvestimentAccountTransactionModel = getModelForClass(InvestimentAccountTransaction, {
    schemaOptions: {
        collection: "investiment-account-transactions"
    }
})