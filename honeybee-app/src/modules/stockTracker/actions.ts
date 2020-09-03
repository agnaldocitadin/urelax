import { Activity, BalanceSheet, StockTracker, UserAccount } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_STOCK_TRACKERS, APPEND_STOCK_TRACKER_ACTIVITIES, CLEAR_STOCK_TRACKER_PREVIEW, PREPATE_STOCK_TRACKER_TO_CREATE, REGISTER_STOCK_TRACKER_BALANCE, REMOVE_STOCK_TRACKERS, RESET_STOCK_TRACKER_MODULE, SELECT_STOCK_TRACKER, SELECT_STOCK_TRACKER_TO_UPDATE, UPDATE_MAIN_STOCK_TRACKER, UPDATE_SELECTED_STOCK_TRACKER } from "./actionTypes"

export const selectStockTracker = (stockTracker: StockTracker): ReduxAction => ({
    type: SELECT_STOCK_TRACKER,
    data: stockTracker
})

export const updateMainStockTracker = (stockTracker: StockTracker): ReduxAction => ({
    type: UPDATE_MAIN_STOCK_TRACKER,
    data: stockTracker
})

export const updateSelectedStockTracker = (stockTracker: StockTracker): ReduxAction => ({
    type: UPDATE_SELECTED_STOCK_TRACKER,
    data: stockTracker
})

export const selectStockTrackerToUpdate = (stockTracker: StockTracker): ReduxAction => ({
    type: SELECT_STOCK_TRACKER_TO_UPDATE,
    data: stockTracker
})

export const prepateStockTrackerToCreate = (user: UserAccount): ReduxAction => ({
    type: PREPATE_STOCK_TRACKER_TO_CREATE,
    data: { userAccount: user } as StockTracker
})

export const appendStockTrackers = (stockTrackers: StockTracker[], position: "begin" | "end" = "end", reset: boolean = false): ReduxAction => ({
    type: APPEND_STOCK_TRACKERS,
    data: {
        stockTrackers,
        position,
        reset
    }
})

export const removeStockTrackers = (id: string): ReduxAction => ({
    type: REMOVE_STOCK_TRACKERS,
    data: id
})

export const appendStockTrackerActivities = (activities: Activity[], position: "begin" | "end" = "end", reset: boolean = false): ReduxAction => ({
    type: APPEND_STOCK_TRACKER_ACTIVITIES,
    data: {
        activities,
        position,
        reset
    }
})

export const registerStockTrackerBalance = (balances: BalanceSheet[]): ReduxAction => ({
    type: REGISTER_STOCK_TRACKER_BALANCE,
    data: balances
})

export const clearStockTrackerPreview = (): ReduxAction => ({
    type: CLEAR_STOCK_TRACKER_PREVIEW,
    data: null
})

export const resetStockTrackerModule = (): ReduxAction => ({
    type: RESET_STOCK_TRACKER_MODULE,
    data: []
})