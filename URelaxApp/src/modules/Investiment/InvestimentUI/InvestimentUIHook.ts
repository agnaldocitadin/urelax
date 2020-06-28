import { useNavigation } from "@react-navigation/native"
import { Account, AppliedInvestiment, InvestimentType } from "honeybee-api"
import { arrays } from "js-commons"
import { useCallback, useState } from "react"
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import StockTracker from "../../StockTracker"
import { fetchAppiedInvestiments } from "../api"

type InvestimentHook = {
    patrimony: number,
    currency: AppliedInvestiment[]
    stocks: AppliedInvestiment[]
}

const empty: InvestimentHook = {
    patrimony: 0,
    currency: [],
    stocks: []
}

export const useInvestimentUIHook = () => {
    
    const navigation = useNavigation()
    const { showAPIError } = Messaging.actions()
    const { selectStockTrackerID } = StockTracker.actions()
    const account: Account = Identity.select("activeAccount")
    const [ investiments, setInvestiments ] = useState<InvestimentHook>(empty)

    const handleAdd = useCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT), [])

    const handleFilter = useCallback(() => navigation.navigate(Routes.INVESTIMENT_FILTER), [])

    const handleStockTracker = useCallback((item: AppliedInvestiment) => {
        selectStockTrackerID(item.refID)
        navigation.navigate(Routes.STOCKTRACKER_PREVIEW)
    }, [])
    
    useEffectWhenReady(async () => {
        try {
            const appliedInvestiments = await fetchAppiedInvestiments(account._id)
            
            if (appliedInvestiments) {
                const currency = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.CURRENCY)
                const stocks = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.STOCK)
                const patrimony = arrays.sum(currency, item => item.amount)
                
                setInvestiments({
                    patrimony,
                    currency,
                    stocks
                })
            }
        }
        catch(error) {
            showAPIError(error)
        }
    })

    return {
        investiments,
        handleAdd,
        handleFilter,
        handleStockTracker
    }
}