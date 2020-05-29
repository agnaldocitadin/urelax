import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"

const INITIAL_STATE: ReducerState = {
    todoA: 0
}

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {
    ADD_A: (state: ReducerState, payload: any): ReducerState => {
        console.log("ADD_A")
        return {
            ...state, 
            todoA: state.todoA + payload
        }
    },
    ADD_B: (state: ReducerState, payload: any): ReducerState => {
        console.log("ADD_B")
        return {
            ...state
        }
    }
})
