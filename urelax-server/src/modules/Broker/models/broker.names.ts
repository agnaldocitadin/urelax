import { Brokers } from 'urelax-api'
import { ErrorCodes } from "../../../core/error.codes"
import Logger from "../../../core/Logger"

export type BrokerNamesDef = { code: Brokers, name: string, logo: string }

/**
 *
 *
 * @export
 * @class BrokerNames
 */
export class BrokerNames {

    static CLEAR: BrokerNamesDef = { 
        code: Brokers.CLEAR, 
        name: "Clear Corretora",
        logo: "/logo.png" 
    }
    
    static convert(code: String | Brokers): BrokerNamesDef {
        const value = Object.values(BrokerNames).find(f => f.code === code)
        if (value) return value
        Logger.throw({ code: ErrorCodes.STRATEGY_NOT_FOUND })
    }
}