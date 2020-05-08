import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TimeStamps } from '@typegoose/typegoose/lib/defaultClasses'
import { TransactionType } from 'honeybee-api'
import mongoose from 'mongoose'
import { Account } from './account.model'

/**
 * OK
 *
 * @export
 * @class FinancialHistory
 * @extends {Typegoose}
 */
export class FinancialHistory extends TimeStamps {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    date!: Date

    @prop({ ref: "Account", required: true })
    acount!: Ref<Account>

    @arrayProp({ items: "Transaction", default: [] })
    transactions: Transaction[]

    @prop({ required: true })
    locked!: boolean

}

class Transaction {

    @prop({ required: true })
    dateTime: Date

    @prop({ required: true, enum: TransactionType })
    type: TransactionType

    @prop({ required: true })
    value: number
}

export const FinancialHistoryModel = getModelForClass(FinancialHistory, {
    schemaOptions: {
        collection: "financial-history-test"
    }
})