import { arrayProp, getModelForClass, prop, Ref } from '@typegoose/typegoose'
import { TransactionType } from 'honeybee-api'
import mongoose from 'mongoose'
import { Account } from './profile.model'

class Transaction {

    @prop({ required: true })
    dateTime: Date

    @prop({ required: true, enum: TransactionType })
    type: string

    @prop({ required: true })
    value: number
}

/**
 * OK
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
    acount!: Ref<Account>

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
        collection: "financial-history-test"
    }
})