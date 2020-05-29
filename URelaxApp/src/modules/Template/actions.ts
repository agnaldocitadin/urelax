import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    todoA: number
}

export type ActionTypes = {
    ADD_A(state: ReducerState, payload: any): ReducerState
    ADD_B(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        addTodoA: () => {
            dispatch({ type: "ADD_A" } as DispatchType<ActionNames>)
        },
        addTodoB: () => {
            dispatch({ type: "ADD_B" } as DispatchType<ActionNames>)
        }
    }
}

export default Actions