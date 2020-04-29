import { arrayProp, instanceMethod, prop, Ref, Typegoose } from '@hasezoey/typegoose'
import mongoose from "mongoose"
import { StockSheet } from './balance.sheet.model'
import { BrokerAccount } from './broker.account.model'
import { UserAccount } from './user.account.model'

/**
 *
 *
 * @export
 * @class Broker
 * @extends {Typegoose}
 */
export class BalanceSheetHistory extends Typegoose {

    _id?: mongoose.Types.ObjectId
    
    @prop({ required: true })
    date!: Date

    @prop({ ref: UserAccount, required: true })
    userAccount!: Ref<UserAccount>

    @prop({ ref: BrokerAccount, required: true })
    brokerAccount!: Ref<BrokerAccount>

    @prop({ required: true, default: 0 })
    currentAmount!: number

    @arrayProp({ items: Object })
    stocks: StockSheet[]

    @instanceMethod
    public getTotalAmount() {
        return this.currentAmount + this.getTotalStock()
    }

    @instanceMethod
    public getTotalStock() {
        return this.stocks.reduce((sum, stock) => sum += (stock.qty * stock.lastAvailablePrice), 0) || 0
    }

}

export const BalanceSheetHistoryModel = new BalanceSheetHistory().getModelForClass(BalanceSheetHistory, {
    schemaOptions: {
        collection: "balance-sheet-histories"
    }
})