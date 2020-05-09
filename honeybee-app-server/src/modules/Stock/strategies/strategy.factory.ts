import Logger from '../../../core/Logger'
import { InvestimentStrategy } from './investiment.strategy'
import { StrategyNames, StrategyNamesDef } from './strategy.names'

const strategies = new Map<string, any>()

export const StrategyFactory = {

    /**
     *
     *
     */
    init: async () => {
        Object.values(StrategyNames).map(async (strategy: StrategyNamesDef) => {
            let strategyImpl = await import(/* webpackChunkName: "strategy-" */ `../strategies/${strategy.file}`)
            strategies.set(strategy._id, strategyImpl[strategy.impl])
            Logger.info("Strategy %s:%s - READY", strategy._id, strategy.file)
        })
    },


    /**
     *
     *
     * @param {string} strategy
     * @returns {InvestimentStrategy<any>}
     */
    create: (strategy: string): InvestimentStrategy<any> => {
        const StrategyImpl = strategies.get(strategy)
        if (!StrategyImpl) {
            Logger.error("InvestimentStrategy %s doesn't exist.", strategy)
            return
        }
        return new StrategyImpl()
    }

}