import { instanceMethod, prop, Ref, Typegoose } from '@hasezoey/typegoose'
import { StockTrackerStatus } from 'honeybee-api'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { STFrequencyDef, StockTrackerFrequency } from '../../stock-tracker/stock.tracker.frequency'
import { StrategyNames } from '../../strategies/strategy.names'
import { Account } from './account.model'

/**
 *
 *
 * @export
 * @class StockTracker
 * @extends {Typegoose}
 */
export class StockTracker extends Typegoose {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    // @prop({ ref: BrokerAccount, required: true })
    // brokerAccount!: Ref<BrokerAccount>

    @prop({ required: true })
    symbol!: string
    
    @prop({ enum: Object.values(StrategyNames).map(strategy => strategy.id), required: true })
    strategy: string
    
    @prop({ required: true, enum: StockTrackerStatus })
    status!: string

    @prop({ required: true, enum: Object.values(StockTrackerFrequency).map(frequency => frequency.type) })
    frequency!: string

    @prop()
    lastFrequencyUpdate!: Date

    // @prop({ default: 0.0 })
    // stockAmountLimit?: number

    // @prop({ default: true })
    // autoAmountLimit?: boolean

    @prop({ default: () => new Date() })
    createdAt?: Date

    // @instanceMethod
    // public getSymbol(): string {
    //     return (<Stock>this.stock).symbol
    // }
    
    @instanceMethod
    public getFrequency(): STFrequencyDef {
        return StockTrackerFrequency.convert(this.frequency)
    }
    
    @instanceMethod
    public getUserAccountId(): ObjectId | string {
        return this.account && (<any>this.account)._doc ? (<any>this.account)._id : this.account
    }

    // @instanceMethod
    // public getBrokerAccountId(): ObjectId | string {
    //     return this.brokerAccount && (<any>this.brokerAccount)._doc ? (<any>this.brokerAccount)._id : this.brokerAccount
    // }

}

export const StockTrackerModel = new StockTracker().getModelForClass(StockTracker, {
    schemaOptions: {
        collection: "stock-trackers"
    }
})