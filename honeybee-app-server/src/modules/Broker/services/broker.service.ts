import { Brokers, InvestimentType } from "honeybee-api"
import mongoose from 'mongoose'
import { BrokerInvestiment, BrokerInvestimentModel } from "../models"
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

/**
 *
 *
 * @param {{ search?: string, brokerIDs?: mongoose.Types.ObjectId[] }} options
 * @returns {Promise<BrokerInvestiment[]>}
 */
export const findAvailableInvestiments = (options: { search?: string, brokerIDs?: mongoose.Types.ObjectId[] }): Promise<BrokerInvestiment[]> => {
    return BrokerInvestimentModel
        .find({ type: InvestimentType.STOCK })
        .populate("broker")
        .exec()
}