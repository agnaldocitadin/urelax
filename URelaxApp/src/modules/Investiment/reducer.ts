import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {
    selectedGraphIndex: 0,
    statements: [],
    analysis: []
}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    ADD_HISTORY: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state, 
            statements: payload.reset ? payload.history : [...state.statements, ...payload.history]
        }
    },
    SELECT_EVENT: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            selectedEvent: payload
        }
    },
    ADD_ANALYSIS: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            analysis: payload.reset ? payload.analysis : [...state.analysis, ...payload.analysis]
        }
    },
    SELECT_ANALYSIS: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            selectedFinancialAnalysis: payload
        }
    },
    SELECT_GRAPH_INDEX: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            selectedGraphIndex: payload
        }
    }
})
