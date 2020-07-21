import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TransactionType } from 'honeybee-api'
import mongoose from 'mongoose'
import { BrokerAccount } from '../../Broker/models'
import { BrokerInvestiment } from '../../Broker/models/broker.investiment.model'
import { Account } from '../../Identity/models'

export class Transaction {

    @prop({ required: true })
    dateTime!: Date

    @prop({ required: true, enum: TransactionType })
    type!: string

    @prop({ required: true })
    value!: number

    // Dados do investimento, e.g: acao, cdb, tesouro, etc
    @prop({ ref: BrokerInvestiment, required: true })
    investiment: Ref<BrokerInvestiment>
}

/**
 * OK
 * !!: Quem vai gerar os STATEMENT_OPENING são os rastreadores (ação, cdb, etc) que sabem da sua posição 
 * no inicio de cada dia.
 *
 * @export
 * @class FinancialHistory
 * @extends {Typegoose}
 */
export class FinancialHistory {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    date!: Date

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    @prop({ ref: BrokerAccount, required: true })
    brokerAccount!: Ref<BrokerAccount>

    @arrayProp({ _id: false, items: Transaction })
    transactions?: Transaction[]

    @prop({ required: true })
    locked!: boolean

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date

}

export const FinancialHistoryModel = getModelForClass(FinancialHistory, {
    schemaOptions: {
        collection: "financial-history"
    }
})