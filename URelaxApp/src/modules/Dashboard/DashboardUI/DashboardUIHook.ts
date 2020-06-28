import { useNavigation } from "@react-navigation/native"
import { Account, FinancialSummary } from "honeybee-api"
import { useCallback, useState } from "react"
import Dashboard from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import { fetchFinancialSummary } from "../api"

const INITIAL_SUMMARIES = 6

export const useDashboardUIHook = () => {

    const navigation = useNavigation()
    const [ refreshing, setRefreshing ] = useState(false)
    const summaries: FinancialSummary[] = Dashboard.select("history")
    const account: Account = Identity.select("activeAccount")
    const { showAPIError } = Messaging.actions()
    const { setDashboardHistory } = Dashboard.actions()

    const handleInvestiments = useCallback(() => navigation.navigate(Routes.INVESTIMENT), [])
    
    const handleStartInvesting = useCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT), [])

    const handleAnalysis = useCallback(() => navigation.navigate(Routes.INVESTIMENT_ANALYSIS), [])

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [])

    const refresh = useCallback(async () => {
        try {
            const summary = await fetchFinancialSummary(account._id, INITIAL_SUMMARIES)
            setDashboardHistory(summary || []) 
        }
        catch(error) {
            console.log(error)
            showAPIError(error)
        }
    }, [account])

    useEffectWhenReady(() => refresh())

    return {
        refreshing,
        currentPatrimony: summaries[0]?.patrimony || 0,
        summaries: summaries.slice(1),
        handleInvestiments,
        handleStartInvesting,
        handleAnalysis,
        handleRefresh,
    }
}