import { useNetInfo } from "@react-native-community/netinfo"
import { useNavigation } from "@react-navigation/native"
import { arrays } from "js-commons"
import { useCallback, useState } from "react"
import { Account, AppliedInvestiment, BrokerAccount, InvestimentType } from 'urelax-api'
import InvestimentModule from ".."
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import BrokerModule from "../../BrokerModule"
import Identity from "../../IdentityModule"
import { Routes } from "../../NavigationModule/const"
import StockTrackerModule from "../../StockTrackerModule"
import { fetchAppiedInvestiments } from "../api"

export const useInvestimentUIHook = () => {
    
    const navigation = useNavigation()
    const account: Account = Identity.select("activeAccount")
    const investiments = InvestimentModule.select("appliedInvestiments")
    const brokerAccounts: BrokerAccount[] = BrokerModule.select("userBrokerAccounts")
    const { selectStockTrackerID } = StockTrackerModule.actions()
    const { addAppliedInvestiment } = InvestimentModule.actions()
    const [ loading, setLoading ] = useState(true)
    const [ fail, setFail ] = useState(false)
    const [ refreshing, setRefreshing ] = useState(false)
    const netInfo = useNetInfo()

    const handleAdd = animatedCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT))

    const handleFilter = animatedCallback(() => navigation.navigate(Routes.INVESTIMENT_FILTER))

    const handleStockTracker = animatedCallback((item: AppliedInvestiment) => {
        selectStockTrackerID(item.refID)
        navigation.navigate(Routes.STOCKTRACKER_PREVIEW)
    })

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [brokerAccounts, account._id])

    const refresh = useCallback(async () => {
        try {
            const ids = brokerAccounts.map(account => account._id)
            const appliedInvestiments = await fetchAppiedInvestiments(ids)
            
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
    }, [brokerAccounts])
    
    useEffectWhenReady(() => refresh(), ()=>{}, [brokerAccounts])

    return {
        fail,
        loading,
        investiments,
        refreshing,
        online: netInfo.isInternetReachable,
        noInvestiments: (investiments.stocks || []).length === 0 && (investiments.currency || []).length === 0,
        handleRefresh,
        handleAdd,
        handleFilter,
        handleStockTracker
    }
}