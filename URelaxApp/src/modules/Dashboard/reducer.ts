import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { FinancialHistoryApp, MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {
    history: []
}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SET_DASHBOARD_HISTORY: (state: ReducerState, payload: FinancialHistoryApp[]): ReducerState => {
        return {
            ...state, 
            history: payload
        }
    },
})
