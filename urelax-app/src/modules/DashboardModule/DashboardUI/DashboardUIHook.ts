import { DrawerActions, useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { BrokerAccount, FinancialSummary, Profile } from 'urelax-api'
import Dashboard from ".."
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import BrokerModule from "../../BrokerModule"
import Investiment from "../../InvestimentModule"
import Messaging from "../../MessagingModule"
import { Drawers, Routes } from "../../NavigationModule/const"
import SecurityModule from "../../SecurityModule"
import { fetchFinancialSummary } from "../api"

const INITIAL_SUMMARIES = 6

export const useDashboardUIHook = () => {

    const navigation = useNavigation()
    const [ refreshing, setRefreshing ] = useState(false)
    const [ ready, setReady ] = useState(false)
    const summaries: FinancialSummary[] = Dashboard.select("history")
    const profile: Profile = SecurityModule.select("profile")
    const brokerAccounts: BrokerAccount[] = BrokerModule.select("userBrokerAccounts")
    const { showAPIError } = Messaging.actions()
    const { setDashboardHistory } = Dashboard.actions()
    const { selectGraphIndex } = Investiment.actions()

    const handleInvestiments = useCallback(() => navigation.navigate(Drawers.INVESTIMENTS), [])
    
    const handleStartInvesting = animatedCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT))

    const toogleDrawer = animatedCallback(() => navigation.dispatch(DrawerActions.toggleDrawer()))

    const handleAnalysis = useCallback((index: number) => {
        selectGraphIndex(index + 1)
        navigation.navigate(Drawers.ANALYSIS)
    }, [summaries])

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [brokerAccounts])

    const refresh = useCallback(async () => {
        try {
            const ids = brokerAccounts.map(account => account._id)
            const summary = await fetchFinancialSummary(ids, INITIAL_SUMMARIES)
            setDashboardHistory(summary)
        }
        catch(error) {
            showAPIError(error)
        }
        finally {
            setReady(true)
        }
    }, [brokerAccounts])

    useEffect(() => setReady(false), [brokerAccounts])

    useEffectWhenReady(
        () => refresh(),
        ()=> setDashboardHistory(undefined),
        [brokerAccounts]
    )

    return {
        ready,
        refreshing,
        nickname: profile.nickname,
        currentPatrimony: summaries[0]?.patrimony || 0,
        summaries: summaries.slice(1),
        handleInvestiments,
        handleStartInvesting,
        handleAnalysis,
        handleRefresh,
        toogleDrawer
    }
}