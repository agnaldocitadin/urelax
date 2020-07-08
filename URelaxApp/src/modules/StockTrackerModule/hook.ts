import { Account, BrokerInvestiment, StockTracker, StockTrackerInput, StockTrackerStatus } from "honeybee-api"
import { useCallback } from "react"
import StockTrackerModule from "."
import Identity from "../Identity"

export const useStockTracker = () => {

    const account: Account = Identity.select("activeAccount")
    const { setStockTrackerInput } = StockTrackerModule.actions()

    const convertToStockTrackerInput = useCallback((stockTracker: StockTracker): StockTrackerInput => {
        return {
            account: stockTracker.account._id,
            brokerAccount: stockTracker.brokerAccount._id,
            frequency: stockTracker.frequency,
            status: stockTracker.status,
            strategy: stockTracker.strategy,
            strategySetting: stockTracker.strategySetting,
            stockInfo: stockTracker.stockInfo._id
        }
    }, [])

    
    const initStockTrackerByInvestiment = useCallback((investiment: BrokerInvestiment) => {
        setStockTrackerInput({
            account: account._id,
            brokerAccount: "22",
            stockInfo: investiment._id,
            status: StockTrackerStatus.RUNNING
        })
    }, [])

    const initStockTrackerByEntity = useCallback((stockTracker: StockTracker) => {
        const input = convertToStockTrackerInput(stockTracker)
        setStockTrackerInput(input)
    }, [])

    return {
        initStockTrackerByEntity,
        initStockTrackerByInvestiment,
        convertToStockTrackerInput
    }

}