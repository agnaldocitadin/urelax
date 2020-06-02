import AppModuleState from "../AppModuleState"
import { ActionTypes, ReducerState } from "./actions"

const INITIAL_STATE: ReducerState = {}

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {})
