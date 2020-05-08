import { arrayProp, prop, Ref, Typegoose } from '@hasezoey/typegoose'
import { TransactionType } from 'honeybee-api'
import mongoose from 'mongoose'
import { Account } from './account.model'

type Transaction = {
    dateTime: Date
    type: TransactionType
    value: number
}

/**
 * OK
 *
 * @export
 * @class FinancialHistory
 * @extends {Typegoose}
 */
export class FinancialHistory extends Typegoose {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true })
    date!: Date

    @prop({ ref: Account, required: true })
    acount!: Ref<Account>

    @arrayProp({ items: Object, default: [] })
    transactions: Transaction[]

    @prop({ required: true })
    locked!: boolean

    @prop({ default: () => new Date() })
    createdAt?: Date

}

export const FinancialHistoryModel = new FinancialHistory().getModelForClass(FinancialHistory, {
    schemaOptions: {
        collection: "financial-history"
    }
})