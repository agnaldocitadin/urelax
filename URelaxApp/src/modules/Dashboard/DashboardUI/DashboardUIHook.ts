import { useNavigation } from "@react-navigation/native"
import { FinancialHistory } from "honeybee-api"
import { useCallback, useState } from "react"
import Dashboard from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import { fetchFinancialHistory } from "../api"
import { FinancialHistoryApp } from "../const"
import { select } from "../reducer"

export const useDashboardUIHook = () => {

    const navigation = useNavigation()
    const [ refreshing, setRefreshing ] = useState(false)
    const { showAPIError } = Messaging.actions()
    const { setDashboardHistory } = Dashboard.actions()
    const history = select("history")

    const handleInvestiments = useCallback(() => navigation.navigate(Routes.INVESTIMENT), [])

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [])

    const refresh = useCallback(async () => {
        try {
            const histories = await fetchFinancialHistory("", 6)
            setDashboardHistory(histories.map(history => convertToFinancialHistoryApp(history))) 
        }
        catch(error) {
            console.log(error)
            showAPIError(error)
        }
    }, [])

    // useEffectWhenReady(() => refresh())

    return {
        refreshing,
        currentPatrimony: history[0],
        history,
        handleInvestiments,
        handleRefresh
    }
}

const convertToFinancialHistoryApp = (history: FinancialHistory): FinancialHistoryApp => {
    return null
}