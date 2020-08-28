import { Brokers, InvestimentType } from "honeybee-api"
import { BrokerInvestiment, BrokerInvestimentModel } from "../models"
import { BrokerNames, BrokerNamesDef } from "../models/broker.names"

/**
 *
 *
 * @param {Brokers} [code]
 * @returns {BrokerNamesDef[]}
 */
export const findBrokersBy = (code?: Brokers): BrokerNamesDef[] => {
    if (code) return [BrokerNames.convert(code)]
    return Object.values(BrokerNames)
}

/**
 *
 *
 * @param {{ 
 *         search?: string
 *         brokerCodes?: Brokers[],
 *         types?: InvestimentType[]
 *     }} options
 * @returns {Promise<BrokerInvestiment[]>}
 */
export const findAvailableInvestiments = (options: { 
        search?: string
        brokerCodes?: Brokers[],
        types?: InvestimentType[]
    }): Promise<BrokerInvestiment[]> => {

    const { 
        search,
        brokerCodes, 
        types = [InvestimentType.STOCK]
    } = options

    return BrokerInvestimentModel
        .find({
            type: { "$in": types },
            ...brokerCodes ? { brokerCode : { "$in": brokerCodes } } : null,
            ...search ? {"$or": [
                { description : { "$regex" : new RegExp(`${search}`, 'i') }},
                { "stock.symbol" : { "$regex" : new RegExp(`${search}`, 'i') }}
            ]} : null
        })
        .exec()
}

/**
 *
 *
 * @param {Brokers} brokerCode
 * @returns
 */
export const findCurrencyByBrokerCode = (brokerCode: Brokers) => {
    return BrokerInvestimentModel.findOne({ brokerCode, type: InvestimentType.CURRENCY }).exec()
}