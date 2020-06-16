import { Account } from "honeybee-api"
import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {}

export const select = (property: keyof ReducerState) => useSelector<any, ReducerState[property]>((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SET_ACTIVE_ACCOUNT: (state: ReducerState, payload: Account): ReducerState => {
        return {
            ...state,
            activeAccount: payload
        }
    }
})
