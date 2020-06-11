import { getModelForClass, prop, Ref } from "@typegoose/typegoose"
import { InvestimentType } from "honeybee-api"
import mongoose from "mongoose"
import { Broker } from "./broker.model"

export class StockInvestimentInfo {
    
    @prop({ required: true })
    symbol!: string

    @prop({ required: true })
    stockLot!: number
}

// Este componente precisa estar em tudo que refencia algum investimento, como stock tracker, historico de transações, etc.
export class BrokerInvestiment {

    _id?: mongoose.Types.ObjectId

    @prop({ ref: Broker, required: true })
    broker: Ref<Broker>

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