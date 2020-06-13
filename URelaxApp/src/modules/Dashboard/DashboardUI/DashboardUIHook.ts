import { useNavigation } from "@react-navigation/native"
import { Account, FinancialHistory } from "honeybee-api"
import { useCallback, useState } from "react"
import Dashboard from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import { fetchFinancialHistory } from "../api"
import { FinancialHistoryApp } from "../const"

export const useDashboardUIHook = () => {

    const navigation = useNavigation()
    const [ refreshing, setRefreshing ] = useState(false)
    const history = Dashboard.select("history")
    const account: Account = Identity.select("activeAccount")
    const { showAPIError } = Messaging.actions()
    const { setDashboardHistory } = Dashboard.actions()

    const handleInvestiments = useCallback(() => navigation.navigate(Routes.INVESTIMENT), [])

    const handleRefresh = useCallback(async () => {
        history
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [])

    const refresh = useCallback(async () => {
        try {
            const histories = await fetchFinancialHistory(account._id, 6)
            setDashboardHistory(histories.map(history => convertToFinancialHistoryApp(history))) 
        }
        catch(error) {
            console.log(error)
            showAPIError(error)
        }
    }, [])

    useEffectWhenReady(() => refresh())

    return {
        refreshing,
        currentPatrimony: 0,
        history,
        handleInvestiments,
        handleRefresh
    }
}

const convertToFinancialHistoryApp = (history: FinancialHistory): FinancialHistoryApp => {
    return null
}