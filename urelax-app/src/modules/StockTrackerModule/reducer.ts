import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {
    stockTrackerActivities: []
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
    ADD_STOCKTRACKER_ACTIVITIES: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            stockTrackerActivities: payload.reset ? payload.activities : [...state.stockTrackerActivities, ...payload.activities]
        }
    },
    UPDATE_SELECTED_STOCKTRACKER: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            selectedStockTracker: {...state.selectedStockTracker, ...payload}
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
    EDIT_STOCKTRACKER_DATA: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            edit: true,
            viewToEdit: String(payload)
        }
    }
})
