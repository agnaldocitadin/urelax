import { Account } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    activeAccount?: Account
}

export type ActionTypes = {
    SET_ACTIVE_ACCOUNT(state: ReducerState, payload: any): ReducerState
    UPDATE_ACTIVE_ACCOUNT(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        setActiveAccount: (account: Account) => {
            dispatch({ type: "SET_ACTIVE_ACCOUNT", payload: account } as DispatchType<ActionNames>)
        },
        updateActiveAccount: (account: Account) => {
            dispatch({ type: "UPDATE_ACTIVE_ACCOUNT", payload: account } as DispatchType<ActionNames>)
        }
    }
}

export default Actions