import { ErrorCodes } from "../../../core/error.codes"
import Logger from "../../../core/Logger"

export type StrategyNamesDef = { _id: string, file: string, impl: string }

/**
 *
 *
 * @export
 * @class StrategyNames
 */
export class StrategyNames {

    static STRATEGY_ONE: StrategyNamesDef = { 
        _id: "STRATEGY_ONE", 
        file: "bb.stochastic.rsi.strategy", 
        impl: "BBStochasticRSIStrategy" 
    }
    // ...
    
    static convert(id: String): StrategyNamesDef {
        const value = Object.values(StrategyNames).find(f => f._id === id)
        if (value) return value
        Logger.throw({ code: ErrorCodes.STRATEGY_NOT_FOUND })
    }
}