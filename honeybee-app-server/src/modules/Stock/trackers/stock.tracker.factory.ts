import { BrokerAccount } from '../../Broker/models/broker.account.model'
import { PluginFactory } from '../../Broker/plugins/plugin.factory'
import { Account } from '../../Identity/models/profile.model'
import { StockTracker } from '../models/stock.tracker.model'
import { StrategyFactory } from '../strategies/strategy.factory'
import { Investor } from './investor'

export const StockTrackerFactory = {

    create: (stockTracker: StockTracker): Investor => {
        let simulation = (<Account>stockTracker.account).simulation
        const adapter = PluginFactory.create(<BrokerAccount>stockTracker.brokerAccount, simulation)
        const strategy = StrategyFactory.create(stockTracker.strategy)
        return new Investor(stockTracker, strategy, adapter)
    }

}