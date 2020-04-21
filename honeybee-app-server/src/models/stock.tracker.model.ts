import { instanceMethod, prop, Ref, Typegoose } from '@hasezoey/typegoose'
import { StockTrackerStatus } from 'honeybee-api'
import { ObjectId } from 'mongodb'
import mongoose from 'mongoose'
import { STFrequencyDef, StockTrackerFrequency } from '../stock-tracker/stock.tracker.frequency'
import { StrategyNames } from '../strategies/strategy.names'
import { BrokerAccount } from './broker.account.model'
import { Stock } from './stock.model'
import { UserAccount } from './user.account.model'

/**
 *
 *
 * @export
 * @class StockTracker
 * @extends {Typegoose}
 */
export class StockTracker extends Typegoose {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: UserAccount, required: true })
    userAccount!: Ref<UserAccount>

    @prop({ ref: BrokerAccount, required: true })
    brokerAccount!: Ref<BrokerAccount>

    @prop({ ref: Stock, required: true })
    stock!: Ref<Stock>
    
    @prop({ enum: Object.values(StrategyNames).map(strategy => strategy.id), required: true })
    strategy: string
    
    @prop({ required: true, enum: StockTrackerStatus })
    status!: string

    @prop({ required: true, enum: Object.values(StockTrackerFrequency).map(frequency => frequency.type) })
    frequency!: string

    @prop()
    lastFrequencyUpdate!: Date

    @prop({ default: 0.0 })
    stockAmountLimit?: number

    @prop({ default: true })
    autoAmountLimit?: boolean

    @prop({ default: () => new Date() })
    createdAt?: Date

    @instanceMethod
    public getSymbol(): string {
        return (<Stock>this.stock).symbol
    }
    
    @instanceMethod
    public getFrequency(): STFrequencyDef {
        return StockTrackerFrequency.convert(this.frequency)
    }
    
    @instanceMethod
    public getUserAccountId(): ObjectId | string {
        return this.userAccount && (<any>this.userAccount)._doc ? (<any>this.userAccount)._id : this.userAccount
    }

    @instanceMethod
    public getBrokerAccountId(): ObjectId | string {
        return this.brokerAccount && (<any>this.brokerAccount)._doc ? (<any>this.brokerAccount)._id : this.brokerAccount
    }

}

export const StockTrackerModel = new StockTracker().getModelForClass(StockTracker, {
    schemaOptions: {
        collection: "stock-trackers"
    }
})