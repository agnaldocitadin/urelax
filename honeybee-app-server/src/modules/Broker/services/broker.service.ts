import { Brokers, InvestimentType } from "honeybee-api"
import mongoose from 'mongoose'
import { BrokerInvestiment, BrokerInvestimentModel } from "../models"
import { Broker, BrokerModel } from "../models/broker.model"


/**
 *
 *
 * @param {{ 
 *         id?: mongoose.Types.ObjectId, 
 *         code?: Brokers, 
 *         active?: boolean 
 *     }} options
 * @returns
 */
export const findBrokersBy = (options: { 
        id?: mongoose.Types.ObjectId, 
        code?: Brokers, 
        active?: boolean 
    }) => {
        
    const { id, code, active } = options
    return BrokerModel.find({
        ...id ? { "_id": mongoose.Types.ObjectId(String(id)) } : null,
        code, 
        active
    }).exec()
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