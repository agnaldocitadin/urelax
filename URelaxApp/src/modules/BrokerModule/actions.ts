import { BrokerAccount } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    userBrokerAccounts?: BrokerAccount[]
    selectedBrokerAccount?: BrokerAccount
}

export type ActionTypes = {
    SET_USER_BROKERACCOUNTS(state: ReducerState, payload: any): ReducerState
    SELECT_BROKER_ACCOUNT(state: ReducerState, payload: any): ReducerState
    UPDATE_SELECTED_BROKER_ACCOUNT(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        setUserBrokerAccounts: (accounts: BrokerAccount[]) => {
            dispatch({ type: "SET_USER_BROKERACCOUNTS", payload: accounts } as DispatchType<ActionNames>)
        },
        selectBrokerAccount: (account: BrokerAccount) => {
            dispatch({ type: "SELECT_BROKER_ACCOUNT", payload: account } as DispatchType<ActionNames>)
        },
        updateSelectedBrokerAccount: (updates: BrokerAccount) => {
            dispatch({ type: "UPDATE_SELECTED_BROKER_ACCOUNT", payload: updates } as DispatchType<ActionNames>)
        },
    }
}

export default Actions