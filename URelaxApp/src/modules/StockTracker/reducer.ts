import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from "./const"

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
            selectedStockTracker: {...state.selectedStockTracker, ...payload}
        }
    }
})
