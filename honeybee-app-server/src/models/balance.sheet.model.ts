import { arrayProp, instanceMethod, prop, Ref, Typegoose } from '@hasezoey/typegoose'
import mongoose from "mongoose"
import { BrokerAccount } from './broker.account.model'
import { UserAccount } from './user.account.model'

export type StockSheet = {
    symbol: string
    qty: number
    averagePrice: number
    progress: number
}

/**
 *
 *
 * @export
 * @class Broker
 * @extends {Typegoose}
 */
export class BalanceSheet extends Typegoose {

    _id?: mongoose.Types.ObjectId
    
    @prop({ ref: UserAccount, required: true })
    userAccount!: Ref<UserAccount>

    @prop({ ref: BrokerAccount })
    brokerAccount: Ref<BrokerAccount>

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: 0 })
    initialAmount!: number

    @prop({ default: 0 })
    currentAmount!: number

    @arrayProp({ items: Object, default: [] })
    stocks: StockSheet[]

    @instanceMethod
    public isBought(symbol: string) {
        const stock = this.stocks.find(stock => stock.symbol === symbol)
        return stock && stock.qty > 0
    }

    @instanceMethod
    public isSold(symbol: string) {
        return !this.isBought(symbol)
    }

    @instanceMethod
    public getQtyFrom(symbol: string) {
        const stock = this.stocks.find(stock => stock.symbol === symbol)
        return stock ? stock.qty : 0
    }

    @instanceMethod
    public getTotalAmount() {
        return this.currentAmount + this.getTotalStock()
    }

    @instanceMethod
    public getTotalStock() {
        return this.stocks.reduce((sum, stock) => sum += (stock.qty * stock.averagePrice), 0) || 0
    }

}

export const BalanceSheetModel = new BalanceSheet().getModelForClass(BalanceSheet, {
    schemaOptions: {
        collection: "balance-sheets"
    }
})