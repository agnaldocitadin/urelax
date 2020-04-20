import { BalanceSheetHistorySummary } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_BALANCE_SHEET_HISTORIES, CLEAR_BALANCE_SHEET_HISTORIES, SELECT_BALANCE_SHEET_HISTORY } from "./actionTypes"

/**
 *
 *
 * @param {BalanceSheetHistorySummary} balance
 * @returns {ReduxAction}
 */
export const selectBalanceSheetHistory = (balance: BalanceSheetHistorySummary): ReduxAction => ({
    type: SELECT_BALANCE_SHEET_HISTORY,
    data: balance
})

/**
 *
 *
 * @param {BalanceSheetHistorySummary[]} balances
 * @param {boolean} [reset]
 * @returns {ReduxAction}
 */
export const appendBalanceSheetHistories = (balances: BalanceSheetHistorySummary[], reset?: boolean): ReduxAction => ({
    type: APPEND_BALANCE_SHEET_HISTORIES,
    data: {
        balances, 
        reset
    }
})

/**
 *
 *
 * @returns {ReduxAction}
 */
export const clearBalanceSheetHistories = (): ReduxAction => ({
    type: CLEAR_BALANCE_SHEET_HISTORIES,
    data: []
})
