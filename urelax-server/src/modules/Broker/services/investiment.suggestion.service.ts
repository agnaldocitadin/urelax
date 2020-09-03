import { mongoose } from "@typegoose/typegoose"
import { InvestimentType } from 'urelax-api'
import { BrokerInvestiment, BrokerInvestimentModel } from "../models"

export const suggestAnInvestiment = async (account: mongoose.Types.ObjectId): Promise<BrokerInvestiment> => {
    return (await BrokerInvestimentModel
        .find({ type: InvestimentType.STOCK })
        .populate("broker"))[0]
}