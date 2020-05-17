import AppModuleState from "../AppModuleState"

export interface ReducerState {
    todoA: number
    todoB: number
}

const INITIAL_STATE: ReducerState = {
    todoA: 0,
    todoB: 0
}

const Acts = {
    ["ADD_A"]: (state: ReducerState): ReducerState => {
        const todoA = state.todoA + 1
        return {...state, todoA }
    },
    ["ADD_B"]: (state: ReducerState): ReducerState => {
        const todoB = state.todoB + 1
        return {...state, todoB }
    }
}

export default AppModuleState.createReducer(INITIAL_STATE, Acts)
