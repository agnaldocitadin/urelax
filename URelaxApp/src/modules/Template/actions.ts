import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
}

export type ActionTypes = {
    ADD_A(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        addA: () => {
            dispatch({ type: "ADD_A" } as DispatchType<ActionNames>)
        }
    }
}

export default Actions