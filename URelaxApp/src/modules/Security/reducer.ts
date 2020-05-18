import AppModuleState from "../AppModuleState"

export interface ReducerState {
}

const INITIAL_STATE: ReducerState = {
}

const Acts = {
    // ["ADD_A"]: (state: ReducerState): ReducerState => {
    //     const todoA = state.todoA + 1
    //     return {...state, todoA }
    // }
}

export default AppModuleState.createReducer(INITIAL_STATE, Acts)
