import { StockTracker } from '../models/stock.tracker.model'
import { BrokerAccount } from '../models/broker.account.model'
import { UserAccount } from '../models/user.account.model'
import { Investor } from '../stock-tracker/investor'
import { PluginFactory } from './plugin.factory'
import { StrategyFactory } from './strategy.factory'

export const StockTrackerFactory = {

    create: (stockTracker: StockTracker): Investor => {
        let simulation = (<UserAccount>stockTracker.userAccount).simulation
        const adapter = PluginFactory.create(<BrokerAccount>stockTracker.brokerAccount, simulation)
        const strategy = StrategyFactory.create(stockTracker.strategy)
        return new Investor(stockTracker, strategy, adapter)
    }

}