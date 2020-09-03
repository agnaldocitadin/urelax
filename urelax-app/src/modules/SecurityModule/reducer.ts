import { Profile } from 'urelax-api'
import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from './const'

const INITIAL_STATE: ReducerState = {}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SET_PROFILE: (state: ReducerState, payload: Profile): ReducerState => {
        return {
            ...state, 
            profile: payload
        }
    }
})
