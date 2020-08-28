import { getModelForClass, prop } from "@typegoose/typegoose"
import { InvestimentType } from "honeybee-api"
import mongoose from "mongoose"
import { BrokerNames } from "./broker.names"

export class StockInvestimentInfo {
    
    @prop({ required: true })
    symbol!: string

    @prop({ required: true })
    stockLot!: number
}

// Este componente precisa estar em tudo que refencia algum investimento, como stock tracker, historico de transações, etc.
export class BrokerInvestiment {

    _id?: mongoose.Types.ObjectId

    @prop({ required: true, enum: Object.values(BrokerNames).map(broker => broker.code) })
    brokerCode: string

    @prop({ required: true, enum: InvestimentType })
    type!: string
    
    @prop({ required: true })
    description!: string

    @prop({ required: true })
    active!: boolean

    @prop({ required: true })
    logo!: string

    // Adicionar um campo para data tipo de investimento
    @prop({ _id: false })
    stock?: StockInvestimentInfo

}

export const BrokerInvestimentModel = getModelForClass(BrokerInvestiment, {
    schemaOptions: {
        collection: "broker-investiments"
    }
})