import { getModelForClass, mongoose, prop, Ref } from "@typegoose/typegoose"
import { StockTrackerStatus } from 'urelax-api'
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
 * O rastreador deverá saber quantas ações possui e o valor de compra (médio) delas. Assim cada
 * operação de compra e venda, será lançado no historico financeiro o valor do ganho/perda do ativo.
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

    @prop({ required: true, enum: Object.values(StrategyNames).map(strategy => strategy._id) })
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

    @prop({ default: 0 })
    qty?: number

    @prop({ default: 0 })
    buyPrice?: number

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

    public getBrokerAccountId?() {
        return (<BrokerAccount>this.brokerAccount)._id
    }

    public getInvestimentId?() {
        return (<BrokerInvestiment>this.stockInfo)._id
    }

    public getAmount?() {
        return (this.qty * this.buyPrice) || 0
    }

    // public toInvestiment?(): AppliedInvestiment {
    //     return {
    //         refID: this._id.toHexString(),
    //         brokerAccountName: (<BrokerAccount>this.brokerAccount).accountName,
    //         amount: this.getAmount(),
    //         qty: this.qty,
    //         investiment: <any>this.stockInfo
    //     }
    // }

    public isBought?() {
        return this.qty > 0
    }

    public isSold?() {
        return this.qty === 0
    }

    public getSymbol?() {
        return (<BrokerInvestiment>this.stockInfo)?.stock?.symbol
    }

    public getStockLot?() {
        return (<BrokerInvestiment>this.stockInfo)?.stock?.stockLot
    }

    public getQty?() {
        return this.qty || 0
    }

    public getBuyPrice?() {
        return this.buyPrice || 0
    }
    
}

export const StockTrackerModel = getModelForClass(StockTracker, {
    schemaOptions: {
        collection: "stock-trackers"
    }
})