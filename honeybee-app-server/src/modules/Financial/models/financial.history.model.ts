import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { ProfitType, TransactionType } from 'honeybee-api'
import { arrays } from 'js-commons'
import mongoose from 'mongoose'
import { BrokerAccount } from '../../Broker/models'
import { BrokerInvestiment } from '../../Broker/models/broker.investiment.model'

export class Transaction {

    @prop({ ref: BrokerInvestiment, required: true })
    investiment: Ref<BrokerInvestiment>
    
    @prop({ required: true })
    dateTime!: Date

    @prop({ required: true, enum: TransactionType })
    type!: string

    @prop({ required: true })
    value!: number
}

export class Profit {

    @prop({ ref: BrokerInvestiment, required: true })
    investiment!: Ref<BrokerInvestiment>

    @prop({ required: true, enum: ProfitType })
    type!: string

    @prop({ required: true })
    value!: number
}

export class Application {

    @prop({ ref: BrokerInvestiment, required: true })
    investiment!: Ref<BrokerInvestiment>
    
    @prop({ required: true })
    amount: number
    
    @prop()
    refId?: mongoose.Types.ObjectId
}

export class FinancialHistory {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    date!: Date

    @prop({ ref: BrokerAccount, required: true })
    brokerAccount!: Ref<BrokerAccount>

    @arrayProp({ _id: false, items: Transaction })
    transactions?: Transaction[]

    @arrayProp({ _id: false, items: Profit })
    profits?: Profit[]

    @arrayProp({ _id: false, items: Application })
    applications?: Application[]

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date

    public getInvestiment?(investimentId: mongoose.Types.ObjectId) {
        return this.applications.find(application => String(application.investiment) == String(investimentId))
    }

    public hasInvestiment?(investimentId: mongoose.Types.ObjectId) {
        return !!this.getInvestiment(investimentId)
    }

    public getBrokerAccount?() {
        return <BrokerAccount>this.brokerAccount
    }

    public getOpeningValue?() {
        // FIXME
        const opening = this.transactions.filter(transaction => transaction.type === TransactionType.STATEMENT_OPENING)
        return arrays.sum(opening, item => item.value)
    }

    public getClosingValue?() {
        // FIXME
        return arrays.sum(this.transactions, item => item.value)
    }

    public getProfit?() {
        return arrays.sum(this.profits, item => item.value)
    }
}

export const FinancialHistoryModel = getModelForClass(FinancialHistory, {
    schemaOptions: {
        collection: "financial-history"
    }
})