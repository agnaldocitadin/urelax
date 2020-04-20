import { BalanceSheetHistorySummary } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_BALANCE_SHEET_HISTORIES, CLEAR_BALANCE_SHEET_HISTORIES, SELECT_BALANCE_SHEET_HISTORY } from "./actionTypes"

export interface BalanceState {
    selectedBalanceHistory: BalanceSheetHistorySummary
    balanceHistory: BalanceSheetHistorySummary[]
}

const INITIAL_STATE: BalanceState = {
    balanceHistory: [],
    selectedBalanceHistory: {}
}

export const BalanceReducer = (state: BalanceState = INITIAL_STATE, action: ReduxAction): BalanceState => {
    switch (action.type) {
        
        case SELECT_BALANCE_SHEET_HISTORY:
            return {
                ...state,
                selectedBalanceHistory: action.data
            }

        case APPEND_BALANCE_SHEET_HISTORIES:
            return {
                ...state,
                balanceHistory: action.data.reset ? action.data.balances : [...state.balanceHistory, ...action.data.balances]
            }

        case CLEAR_BALANCE_SHEET_HISTORIES:
            return {
                ...state,
                balanceHistory: action.data
            }

        default: return state
    }
}
