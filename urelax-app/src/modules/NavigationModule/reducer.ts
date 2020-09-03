import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from './const'

const INITIAL_STATE: ReducerState = {
    stack: "auth"
}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SWITCH_STACK: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            stack: payload
        }
    }
})
