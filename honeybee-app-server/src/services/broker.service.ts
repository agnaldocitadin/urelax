import { Broker, BrokerModel } from "../models/broker.model"
import { Brokers } from "../models/types.d"

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