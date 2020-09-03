import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {
    activities: []
}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SELECT_ACTIVITY: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state, 
            selectedActiviy: payload
        }
    },
    ADD_ACTIVITIES: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state, 
            activities: payload.reset ? payload.activities : [...state.activities, ...payload.activities]
        }
    }
})
