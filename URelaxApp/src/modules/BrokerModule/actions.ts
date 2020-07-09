import { BrokerAccount } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    userBrokerAccounts?: BrokerAccount[]
}

export type ActionTypes = {
    SET_USER_BROKERACCOUNTS(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        setUserBrokerAccounts: (accounts: BrokerAccount[]) => {
            dispatch({ type: "SET_USER_BROKERACCOUNTS", payload: accounts } as DispatchType<ActionNames>)
        },
    }
}

export default Actions