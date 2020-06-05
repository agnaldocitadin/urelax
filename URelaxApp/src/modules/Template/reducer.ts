import { useSelector } from "react-redux"
import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"
import { MODULE_NAME } from "./const"

const INITIAL_STATE: ReducerState = {
    todoA: 0
}

export const select = (property: keyof ReducerState) => useSelector((state: any) => state[MODULE_NAME][property])

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
