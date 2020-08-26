import { Account, BrokerAccount, BrokerInvestiment, StockTracker, StockTrackerInput, StockTrackerStatus } from "honeybee-api"
import { useCallback } from "react"
import StockTrackerModule from "."
import BrokerModule from "../BrokerModule"
import Identity from "../IdentityModule"

export const useStockTracker = () => {

    const account: Account = Identity.select("activeAccount")
    const brokerAccounts: BrokerAccount[] = BrokerModule.select("userBrokerAccounts")
    const { selectStockTracker } = StockTrackerModule.actions()

    const convertToStockTrackerInput = useCallback((stockTracker: StockTracker): StockTrackerInput => {
        return {
            account: stockTracker?.account?._id,
            brokerAccount: stockTracker?.brokerAccount?._id,
            frequency: stockTracker.frequency,
            status: stockTracker.status,
            strategy: stockTracker.strategy,
            stockInfo: stockTracker?.stockInfo?._id,
            strategySetting: {
                autoAmountLimit: stockTracker.strategySetting?.autoAmountLimit,
                stockAmountLimit: stockTracker.strategySetting?.stockAmountLimit
            }
        }
    }, [])

    
    const initStockTrackerByInvestiment = useCallback((investiment: BrokerInvestiment) => {
        // TODO Escolher a conta da corretora no wizard
        const brokerAccount = brokerAccounts.find(account => account.brokerCode === investiment.broker.code)
        selectStockTracker({
            account,
            brokerAccount: brokerAccount,
            stockInfo: investiment,
            status: account.preference?.addStockTrackerPaused ? StockTrackerStatus.PAUSED : StockTrackerStatus.RUNNING,
            strategySetting: {
                autoAmountLimit: false,
                stockAmountLimit: 0
            }
        })
    }, [account])

    return {
        initStockTrackerByInvestiment,
        convertToStockTrackerInput
    }

}