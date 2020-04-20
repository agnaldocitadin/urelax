import { Activity, BalanceSheetHistorySummary, BalanceSheetSummary } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { INIT_DASHBOARD_DATA, RESET_DASHBOARD_DATA, SET_LAST_ACTIVITY } from "./actionTypes"

export interface DashboardState {
    balanceSummary: BalanceSheetSummary
    balanceHistorySummary: BalanceSheetHistorySummary[]
    lastActivity: Activity
}

const INITIAL_STATE: DashboardState = {
    balanceSummary: {},
    balanceHistorySummary: [],
    lastActivity: {} as Activity
}

export const DashboardReducer = (state: DashboardState = INITIAL_STATE, action: ReduxAction): DashboardState => {
    switch (action.type) {

        case INIT_DASHBOARD_DATA:
            return {
                ...state,
                ...action.data
            }

        case RESET_DASHBOARD_DATA:
            return {
                ...state,
                ...INITIAL_STATE
            }

        case SET_LAST_ACTIVITY:
            return {
                ...state,
                lastActivity: action.data
            }

        default: return state
    }
}
