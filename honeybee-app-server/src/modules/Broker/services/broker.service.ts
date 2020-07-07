import { Brokers, InvestimentType } from "honeybee-api"
import mongoose from 'mongoose'
import { BrokerInvestiment } from "../models"
import { Broker, BrokerModel } from "../models/broker.model"

/**
 *
 *
 * @returns {Promise<Broker[]>}
 */
export const findAllActives = (): Promise<Broker[]> => {
    return BrokerModel.find({ active: true }).exec()
}

/**
 *
 *
 * @param {Brokers} brokerCode
 * @returns {Promise<Broker>}
 */
export const findByCode = (brokerCode: Brokers): Promise<Broker> => {
    return BrokerModel.findOne({ code: brokerCode }).exec()
}

export const findAvailableInvestiments = (search: string, brokerIDs?: mongoose.Types.ObjectId[]): Promise<BrokerInvestiment[]> => {
    // return BrokerInvestimentModel.find({}).exec()
    return Promise.resolve([{
        active: true,
        description: "Azul Linhas Aéreas",
        type: InvestimentType.STOCK

    }] as BrokerInvestiment[])
}