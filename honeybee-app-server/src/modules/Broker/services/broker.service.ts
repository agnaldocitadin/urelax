import { Brokers, InvestimentType } from "honeybee-api"
import { utils } from "js-commons"
import mongoose from 'mongoose'
import { toObjectId } from "../../../core/server-utils"
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
        ...toObjectId("_id", id),
        ...utils.nonNull("code", code),
        ...utils.nonNull("active", active)
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
 * @param {{ 
 *         search?: string
 *         brokerIDs?: mongoose.Types.ObjectId[],
 *         types?: InvestimentType[]
 *     }} options
 * @returns {Promise<BrokerInvestiment[]>}
 */
export const findAvailableInvestiments = (options: { 
        search?: string
        brokerIDs?: mongoose.Types.ObjectId[],
        types?: InvestimentType[]
    }): Promise<BrokerInvestiment[]> => {

    const { 
        search,
        brokerIDs, 
        types = [InvestimentType.STOCK]
    } = options

    return BrokerInvestimentModel
        .find({
            ...brokerIDs ? { _id : { "$in": brokerIDs } } : null,
            type: { "$in": types },
            "$or": [
                { description : { "$regex" : new RegExp(`${search}`, 'i') }},
                { "stock.symbol" : { "$regex" : new RegExp(`${search}`, 'i') }}
            ]
        })
        .populate("broker")
        .exec()
}