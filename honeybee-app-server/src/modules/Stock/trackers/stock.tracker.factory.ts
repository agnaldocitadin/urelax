import { Investor } from "."
import { BrokerAccount } from "../../Broker/models"
import { PluginFactory } from "../../Broker/plugins"
import { Account } from "../../Identity/models"
import { StockTracker } from "../models"
import { StrategyFactory } from "../strategies"

export const StockTrackerFactory = {

    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @returns {Investor}
     */
    create: (stockTracker: StockTracker): Investor => {
        let simulation = (<Account>stockTracker.account).simulation
        const adapter = PluginFactory.create(<BrokerAccount>stockTracker.brokerAccount, simulation)
        const strategy = StrategyFactory.create(stockTracker.strategy)
        return new Investor(stockTracker, strategy, adapter)
    }

}