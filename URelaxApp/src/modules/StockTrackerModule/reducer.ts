import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME, StockTrackerWizardViews } from "./const"

const INITIAL_STATE: ReducerState = {
    stockTrackerStatements: []
}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SELECT_STOCKTRACKER_ID: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state, 
            selectedStockTrackerID: payload
        }
    },
    SELECT_STOCKTRACKER: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            edit: false,
            selectedStockTracker: payload
        }
    },
    ADD_STOCKTRACKER_STATEMENTS: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            stockTrackerStatements: payload.reset ? payload.statements : [...state.stockTrackerStatements, ...payload.statements]
        }
    },
    UPDATE_SELECTED_STOCKTRACKER: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            selectedStockTracker: {...payload}
        }
    },
    SET_STRATEGIES: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            strategies: payload
        }
    },
    SET_FREQUENCIES: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            frequencies: payload
        }
    },
    EDIT_FREQUENCY: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            edit: true,
            viewToEdit: String(StockTrackerWizardViews.FREQUENCY)
        }
    },
    EDIT_STRATEGY: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            edit: true,
            viewToEdit: String(StockTrackerWizardViews.STRATEGY)
        }
    },
    EDIT_TRANSACTION: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            edit: true,
            viewToEdit: String(StockTrackerWizardViews.TRANSACTION)
        }
    }
})
