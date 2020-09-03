import { getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { ProfitType } from 'honeybee-api'
import { BrokerInvestiment } from '../../Broker/models'
import { InvestimentAccount } from './investiment.account.model'

export class InvestimentAccountProfit {

    @prop({ ref: InvestimentAccount, required: true })
    investimentAccount!: Ref<InvestimentAccount>

    @prop({ ref: BrokerInvestiment, required: true })
    investiment!: Ref<BrokerInvestiment>

    @prop({ required: true })
    dateTime!: Date
    
    @prop({ required: true, enum: ProfitType })
    type!: string

    @prop({ required: true })
    value!: number

}

export const InvestimentAccountProfitModel = getModelForClass(InvestimentAccountProfit, {
    schemaOptions: {
        collection: "investiment-account-profits"
    }
})