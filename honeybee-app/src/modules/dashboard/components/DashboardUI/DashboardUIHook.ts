import { BalanceSheetHistorySummary } from "honeybee-api"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { animatedCallback, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { selectBalanceSheetHistory } from "../../../balance"
import { initDashboardData } from "../../actions"
import { fetchCurrentBalanceSheetByUser, fetchLastBalancesSheets, fetchLastUserActivity } from "../../api"

export const useDashboardUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()

    const { nickname, _id } = useSelector((state: States) => state.SIGNIN.authenticatedUser)
    
    const { balanceSummary, balanceHistorySummary, lastActivity } = useSelector((state: States) => state.DASHBOARD)

    const handleActivities = animatedCallback(() => navigation.navigate(Routes.ActivityListUI))

    const handleBalances = animatedCallback(() => navigation.navigate(Routes.BalanceHistoryUI))
    
    const handleBalancePress = animatedCallback((balance: BalanceSheetHistorySummary) => {
        dispatch(selectBalanceSheetHistory(balance))
        navigation.navigate(Routes.BalanceHistoryDetailUI)
    })

    const handleStockTracker = animatedCallback(() => navigation.navigate(Routes.StockTrackerListUI))

    const handleSetting = animatedCallback(() => navigation.navigate(Routes.SettingUI))

    const handleNicknameTouch = animatedCallback(() => navigation.navigate(Routes.AccountUI))

    useEffectWhenReady(async () => {
        try {
            let balance = await fetchCurrentBalanceSheetByUser(_id)
            let history = await fetchLastBalancesSheets(_id, 13)
            let activity = await fetchLastUserActivity(_id)
            dispatch(initDashboardData(balance, history, activity))
        }
        catch(error) {
            navigation.navigate(Routes.FastAuthFailureUI)
        }
    })

    return {
        nickname,
        balanceSummary,
        balanceHistorySummary,
        lastActivity,
        noBalances: balanceHistorySummary.length === 0,
        handleActivities,
        handleBalances,
        handleStockTracker,
        handleSetting,
        handleNicknameTouch,
        handleBalancePress
    }
}