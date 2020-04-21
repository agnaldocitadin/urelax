import { BalanceSheetHistorySummary } from "honeybee-api"
import { useCallback, useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import AppConfig from "../../../../core/AppConfig"
import { animatedPromise, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { showError } from "../../../message"
import { appendBalanceSheetHistories, clearBalanceSheetHistories, selectBalanceSheetHistory } from "../../actions"
import { fetchBalanceSheetHistoriesByUserQuery } from "../../api"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useBalanceHistoryUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const id = useSelector((state: States) => state.SIGNIN.authenticatedUser._id || "")
    const balances = useSelector((state: States) => state.BALANCE.balanceHistory)
    const [ fail, setFail ] = useState(false)

    const handleBalancePress = useCallback((balance: BalanceSheetHistorySummary) => animatedPromise(() => {
        dispatch(selectBalanceSheetHistory(balance))
        navigation.navigate(Routes.BalanceHistoryDetailUI)
    }), [])

    const handleRefresh = useCallback(async () => {
        try {
            let balances = await fetchBalanceSheetHistoriesByUserQuery(id, new Date(), 0, AppConfig.QTY_INITIAL_BALANCE_HISTORY, "day")
            dispatch(appendBalanceSheetHistories(balances, true))
        }
        catch(error) {
            setFail(true)
        }
    }, [])

    const handleLoadMoreData = useCallback(async (page: number): Promise<BalanceSheetHistorySummary[]> => {
        try {
            return await fetchBalanceSheetHistoriesByUserQuery(id, new Date(), page, AppConfig.QTY_INITIAL_BALANCE_HISTORY, "day")
        }
        catch(error) {
            dispatch(showError(JSON.stringify(error)))
            return Promise.reject()
        }
    }, [])

    useEffectWhenReady(() => handleRefresh(), () => dispatch(clearBalanceSheetHistories()))

    return {
        fail,
        balances,
        handleRefresh,
        handleLoadMoreData,
        handleBalancePress
    }
}