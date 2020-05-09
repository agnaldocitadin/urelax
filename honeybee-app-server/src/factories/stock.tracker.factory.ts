import { BrokerAccount } from '../models/broker.account.model'
import { Account } from '../models/profile.model'
import { StockTracker } from '../models/stock.tracker.model'
import { Investor } from '../stock-tracker/investor'
import { PluginFactory } from './plugin.factory'
import { StrategyFactory } from './strategy.factory'

export const StockTrackerFactory = {

    create: (stockTracker: StockTracker): Investor => {
        let simulation = (<Account>stockTracker.account).simulation
        const adapter = PluginFactory.create(<BrokerAccount>stockTracker.brokerAccount, simulation)
        const strategy = StrategyFactory.create(stockTracker.strategy)
        return new Investor(stockTracker, strategy, adapter)
    }

}