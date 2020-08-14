import { useNavigation } from "@react-navigation/native"
import { Account, AppliedInvestiment, InvestimentType } from "honeybee-api"
import { arrays } from "js-commons"
import { useCallback, useState } from "react"
import InvestimentModule from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../IdentityModule"
import { Routes } from "../../NavigationModule/const"
import StockTrackerModule from "../../StockTrackerModule"
import { fetchAppiedInvestiments } from "../api"

export const useInvestimentUIHook = () => {
    
    const navigation = useNavigation()
    const account: Account = Identity.select("activeAccount")
    const investiments = InvestimentModule.select("appliedInvestiments")
    const { selectStockTrackerID } = StockTrackerModule.actions()
    const { addAppliedInvestiment } = InvestimentModule.actions()
    const [ loading, setLoading ] = useState(true)
    const [ fail, setFail ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)

    const handleAdd = useCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT), [])

    const handleFilter = useCallback(() => navigation.navigate(Routes.INVESTIMENT_FILTER), [])

    const handleStockTracker = useCallback((item: AppliedInvestiment) => {
        selectStockTrackerID(item.refID)
        navigation.navigate(Routes.STOCKTRACKER_PREVIEW)
    }, [])

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [account._id])

    const refresh = useCallback(async () => {
        try {
            const appliedInvestiments = await fetchAppiedInvestiments(account._id)
            
            if (appliedInvestiments) {
                const currency = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.CURRENCY)
                const stocks = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.STOCK)
                const patrimony = arrays.sum(currency, item => item.amount)
                
                addAppliedInvestiment({
                    patrimony,
                    currency,
                    stocks
                }, true)
            }
            setLoading(false)
        }
        catch(error) {
            setFail(true)
        }
    }, [account._id])
    
    useEffectWhenReady(() => refresh(), ()=>{}, [account._id])

    return {
        fail,
        loading,
        investiments,
        refreshing,
        handleRefresh,
        handleAdd,
        handleFilter,
        handleStockTracker
    }
}