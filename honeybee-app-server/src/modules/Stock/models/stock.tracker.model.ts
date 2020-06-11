import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose"
import { StockTrackerStatus } from "honeybee-api"
import { BrokerAccount, BrokerInvestiment } from "../../Broker/models"
import { Account } from "../../Identity/models"
import { StrategyNames } from "../strategies"
import { STFrequencyDef, StockTrackerFrequency } from "../trackers"


class StrategySetting {
    
    @prop({ default: 0.0 })
    stockAmountLimit?: number

    @prop({ default: true })
    autoAmountLimit?: boolean
}

/**
 *
 *
 * @export
 * @class StockTracker
 * @extends {Typegoose}
 */
export class StockTracker {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Account, required: true })
    account!: Ref<Account>

    @prop({ ref: BrokerAccount, required: true })
    brokerAccount!: Ref<BrokerAccount>

    @prop({ enum: Object.values(StrategyNames).map(strategy => strategy.id), required: true })
    strategy: string

    @prop({ _id: false, required: true })
    strategySetting!: StrategySetting
    
    @prop({ required: true, enum: StockTrackerStatus })
    status!: string

    @prop({ required: true, enum: Object.values(StockTrackerFrequency).map(frequency => frequency.type) })
    frequency!: string

    @prop()
    lastFrequencyUpdate?: Date

    @prop({ ref: BrokerInvestiment, required: true })
    stockInfo!: Ref<BrokerInvestiment>

    @prop({ default: () => new Date() })
    createdAt?: Date

    @prop({ default: () => new Date() })
    updatedAt?: Date
    
    public getFrequency?(): STFrequencyDef {
        return StockTrackerFrequency.convert(this.frequency)
    }
    
    public getAccountId?() {
        return (<Account>this.account)._id
    }

}

export const StockTrackerModel = getModelForClass(StockTracker, {
    schemaOptions: {
        collection: "stock-trackers"
    }
})