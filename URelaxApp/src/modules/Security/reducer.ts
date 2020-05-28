import AppModuleState from "../AppModuleState"

export interface ReducerState {
}

const INITIAL_STATE: ReducerState = {
}

export default AppModuleState.createReducer(INITIAL_STATE, {
    // ["TOKEN"]: (state: ReducerState, payload: any): ReducerState => {
    //     return {
    //         ...state, 
    //         token: payload
    //     }
    // }
})
