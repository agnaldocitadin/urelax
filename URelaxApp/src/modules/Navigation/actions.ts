import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    stack: string
}

export type ActionTypes = {
    SWITCH_STACK(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        switchStack: (stack: string) => {
            dispatch({ type: "SWITCH_STACK", payload: stack } as DispatchType<ActionNames>)
        }
    }
}

export default Actions