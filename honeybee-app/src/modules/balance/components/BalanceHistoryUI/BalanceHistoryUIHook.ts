import { BalanceSheetHistorySummary, GroupBy } from "honeybee-api"
import { useCallback, useEffect, useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import AppConfig from "../../../../core/AppConfig"
import { animatedCallback, animatedPromise, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { showAPIError } from "../../../message"
import { appendBalanceSheetHistories, clearBalanceSheetHistories, selectBalanceSheetHistory } from "../../actions"
import { fetchBalanceSheetHistoriesByUserQuery } from "../../api"

interface State {
    ready: boolean
    fail: boolean
    grouping: GroupBy
    loading: boolean
}

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

    const [ viewState, setViewState ] = useState<State>({
        ready: false,
        fail: false,
        grouping: "day",
        loading: true
    })

    const handleBalancePress = useCallback((balance: BalanceSheetHistorySummary) => animatedPromise(() => {
        dispatch(selectBalanceSheetHistory(balance))
        navigation.navigate(Routes.BalanceHistoryDetailUI)
    }), [])

    const handleRefresh = useCallback(async () => {
        try {
            let balances = await fetchBalanceSheetHistoriesByUserQuery(id, new Date(), 0, AppConfig.QTY_INITIAL_BALANCE_HISTORY, viewState.grouping)
            dispatch(appendBalanceSheetHistories(balances, true))
        }
        catch(error) {
            setViewState(state => ({...state, fail: true}))
        }
    }, [viewState.grouping])

    const handleLoadMoreData = useCallback(async (page: number): Promise<BalanceSheetHistorySummary[]> => {
        try {
            return await fetchBalanceSheetHistoriesByUserQuery(id, new Date(), page, AppConfig.QTY_INITIAL_BALANCE_HISTORY, viewState.grouping)
        }
        catch(error) {
            dispatch(showAPIError(error))
            return Promise.reject()
        }
    }, [viewState.grouping])

    const handleDay = animatedCallback(async () => {
        setViewState(state => ({...state, grouping: "day"}))
    }, [viewState.grouping])

    const handleWeek = animatedCallback(async () => {
        setViewState(state => ({...state, grouping: "week"}))
    }, [viewState.grouping])

    const handleMonth = animatedCallback(async () => {
        setViewState(state => ({...state, grouping: "month"}))
    }, [viewState.grouping])

    const handleYear = animatedCallback(async () => {
        setViewState(state => ({...state, grouping: "year"}))
    }, [viewState.grouping])

    useEffect(() => {
        if (viewState.ready) {
            (async () => {
                setViewState(state => ({...state, loading: true}))
                await handleRefresh()
                setViewState(state => ({...state, loading: false}))
            })()
        }
    }, [viewState.grouping])

    useEffectWhenReady(async () => {
        await handleRefresh()
        setViewState(state => ({...state, loading: false, ready: true}))
    }, () => dispatch(clearBalanceSheetHistories()))

    return {
        fail: viewState.fail,
        loading: viewState.loading,
        balances,
        grouping: viewState.grouping,
        handleRefresh,
        handleLoadMoreData,
        handleBalancePress,
        handleDay,
        handleWeek,
        handleMonth,
        handleYear
    }
}