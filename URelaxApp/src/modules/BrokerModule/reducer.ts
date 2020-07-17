import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SET_USER_BROKERACCOUNTS: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state, 
            userBrokerAccounts: payload
        }
    },
    SELECT_BROKER_ACCOUNT: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state, 
            selectedBrokerAccount: payload
        }
    },
    UPDATE_SELECTED_BROKER_ACCOUNT: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state, 
            selectedBrokerAccount: {...payload}
        }
    }
})
