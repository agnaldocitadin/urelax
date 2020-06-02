import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"

const INITIAL_STATE: ReducerState = {
    stack: "auth"
}

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    SWITCH_STACK: (state: ReducerState, payload: any): ReducerState => {
        return {
            ...state,
            stack: payload
        }
    }
})
