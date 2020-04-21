import { Activity, BalanceSheet, StockTracker } from "honeybee-api"
import { utils } from "js-commons"
import { Routes } from "../../navigations/Navigator"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_STOCK_TRACKERS, APPEND_STOCK_TRACKER_ACTIVITIES, CLEAR_STOCK_TRACKER_PREVIEW, INIT_STOCK_TRACKER_MODULE, PREPATE_STOCK_TRACKER_TO_CREATE, REGISTER_STOCK_TRACKER_BALANCE, REMOVE_STOCK_TRACKERS, RESET_STOCK_TRACKER_MODULE, SELECT_STOCK_TRACKER, SELECT_STOCK_TRACKER_TO_UPDATE, UPDATE_MAIN_STOCK_TRACKER, UPDATE_SELECTED_STOCK_TRACKER } from "./actionTypes"

export interface StockTrackerState {
    stockTrackers: StockTracker[]
    selectedStockTracker?: StockTracker
    selectedStockTrackerActivities: Activity[]
    balanceSheet?: BalanceSheet
    stockTrackerToUpdate: StockTracker
    isEditing: boolean
}

const INITIAL_STATE: StockTrackerState = {
    stockTrackers: [],
    selectedStockTrackerActivities: [],
    stockTrackerToUpdate: {},
    isEditing: false
}

export const StockTrackerReducer = (state: StockTrackerState = INITIAL_STATE, action: ReduxAction): StockTrackerState => {
    switch (action.type) {

        case INIT_STOCK_TRACKER_MODULE:
            return {
                ...state,
                balanceSheet: action.data.balance,
                selectedStockTrackerActivities: action.data.activities
            }

        case SELECT_STOCK_TRACKER:
            return {
                ...state,
                selectedStockTracker: action.data
            }

        case UPDATE_SELECTED_STOCK_TRACKER:
            return {
                ...state,
                stockTrackerToUpdate: {...state.stockTrackerToUpdate, ...action.data},
                selectedStockTracker: {...state.selectedStockTracker, ...action.data},
                stockTrackers: refreshStockTrackers(state, action, state.stockTrackerToUpdate._id)
            }

        case UPDATE_MAIN_STOCK_TRACKER:
            return {
                ...state,
                selectedStockTracker: {...state.selectedStockTracker, ...action.data},
                stockTrackers: refreshStockTrackers(state, action, state.selectedStockTracker?._id)
            }
            
        case SELECT_STOCK_TRACKER_TO_UPDATE:
            return {
                ...state,
                stockTrackerToUpdate: action.data,
                isEditing: true
            }

        case PREPATE_STOCK_TRACKER_TO_CREATE:
            return {
                ...state,
                stockTrackerToUpdate: action.data,
                isEditing: false
            }

        case APPEND_STOCK_TRACKERS:
            return {
                ...state,
                stockTrackers: action.data.reset ? action.data.stockTrackers : utils.joinArrays(state.stockTrackers, action.data.stockTrackers, action.data.position)
            }

        case APPEND_STOCK_TRACKER_ACTIVITIES:
            return {
                ...state,
                selectedStockTrackerActivities: action.data.reset ? action.data.activities : utils.joinArrays(state.selectedStockTrackerActivities, action.data.activities, action.data.position)
            }

        case REMOVE_STOCK_TRACKERS:
            return {
                ...state,
                stockTrackers: state.stockTrackers.filter(tracker => tracker._id !== action.data).map(stocktracker => stocktracker)
            }

        case REGISTER_STOCK_TRACKER_BALANCE:
            return {
                ...state,
                balanceSheet: action.data
            }

        case CLEAR_STOCK_TRACKER_PREVIEW:
            return {
                ...state,
                selectedStockTracker: {},
                selectedStockTrackerActivities: []
            }

        case RESET_STOCK_TRACKER_MODULE:
            return {
                ...state,
                stockTrackers: action.data,
                selectedStockTracker: {}
            }

        default: return state
    }
}

const refreshStockTrackers = (state: StockTrackerState, action: ReduxAction, id?: string) => {
    const fields: Bee = action.data
    return state.stockTrackers.map(stocktracker => (stocktracker._id === id) ? {...stocktracker, ...fields} : stocktracker)
}

export const getStockTrackerRoutes = (simulation: boolean, isEditing: boolean) => {
    return simulation ? simulationRoute(isEditing) : defaultRoute(isEditing)
}

const defaultRoute = (isEditing: boolean) => {

    const baseRoute = [
        Routes.StockTrackerBrokerUI,
        Routes.StockTrackerSymbolUI,
        Routes.StockTrackerStrategyUI,
        Routes.StockTrackerFrequencyUI,
        Routes.StockTrackerTransactionUI,
        Routes.StockTrackerReviewUI
    ]

    if (isEditing) {
        return [
            Routes.StockTrackerSettingUI,
            ...baseRoute
        ]
    }
    
    return [
        Routes.StockTrackerListUI,
        ...baseRoute
    ]
}

const simulationRoute = (isEditing: boolean) => {
    
    const baseRoute = [
        Routes.StockTrackerSymbolUI,
        Routes.StockTrackerStrategyUI,
        Routes.StockTrackerFrequencyUI,
        Routes.StockTrackerTransactionUI,
        Routes.StockTrackerReviewUI
    ] 

    if (isEditing) {
        return [
            Routes.StockTrackerSettingUI,
            ...baseRoute
        ]
    }
    
    return [
        Routes.StockTrackerListUI,
        ...baseRoute
    ]
}