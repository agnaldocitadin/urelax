import AppModuleState from "../AppModuleState"
import { ActionTypes } from "./actions"

export interface ReducerState {}

const INITIAL_STATE: ReducerState = {}

export default AppModuleState.createReducer<ActionTypes>(INITIAL_STATE, {})
