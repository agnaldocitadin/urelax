import { useNavigation } from "@react-navigation/native"
import { Account, FinancialSummary } from "honeybee-api"
import { useCallback, useState } from "react"
import Dashboard from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import { fetchFinancialSummary } from "../api"

export const useDashboardUIHook = () => {

    const navigation = useNavigation()
    const [ refreshing, setRefreshing ] = useState(false)
    const history: FinancialSummary[] = Dashboard.select("history")
    const account: Account = Identity.select("activeAccount")
    const { showAPIError } = Messaging.actions()
    const { setDashboardHistory } = Dashboard.actions()

    const handleInvestiments = useCallback(() => navigation.navigate(Routes.INVESTIMENT), [])
    
    const handleStartInvesting = useCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT), [])

    const handleRefresh = useCallback(async () => {
        history
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [])

    const refresh = useCallback(async () => {
        try {
            const history = await fetchFinancialSummary(account._id, 6)
            setDashboardHistory(history || []) 
        }
        catch(error) {
            console.log(error)
            showAPIError(error)
        }
    }, [account])

    useEffectWhenReady(() => refresh())

    return {
        refreshing,
        currentPatrimony: 0,
        history,
        handleInvestiments,
        handleStartInvesting,
        handleRefresh,
    }
}