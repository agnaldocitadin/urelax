import { Activity, BalanceSheetHistorySummary, BalanceSheetSummary } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { INIT_DASHBOARD_DATA, RESET_DASHBOARD_DATA, SET_LAST_ACTIVITY } from "./actionTypes"
import { DashboardState } from "./reducer"

export const initDashboardData = (balance: BalanceSheetSummary, history: BalanceSheetHistorySummary[], activity: Activity): ReduxAction => ({
    type: INIT_DASHBOARD_DATA,
    data: {
        balanceSummary: balance,
        balanceHistorySummary: history,
        lastActivity: activity
    } as DashboardState
})

export const resetDashboardData = (): ReduxAction => ({
    type: RESET_DASHBOARD_DATA,
    data: null
})

export const setLastActivityOnDashboard = (activity: Activity): ReduxAction => ({
    type: SET_LAST_ACTIVITY,
    data: activity
})

