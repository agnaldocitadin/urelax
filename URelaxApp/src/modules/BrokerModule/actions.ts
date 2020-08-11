import { BrokerAccount } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"
import { Routes } from "../NavigationModule/const"
import { BrokerAccountWizardViews } from "./const"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    userBrokerAccounts?: BrokerAccount[]
    selectedBrokerAccount?: BrokerAccount
    edit?: boolean
    viewToEdit?: string
}

export type ActionTypes = {
    SET_USER_BROKERACCOUNTS(state: ReducerState, payload: any): ReducerState
    ADD_USER_BROKERACCOUNTS(state: ReducerState, payload: any): ReducerState
    SELECT_BROKER_ACCOUNT(state: ReducerState, payload: any): ReducerState
    UPDATE_SELECTED_BROKER_ACCOUNT(state: ReducerState, payload: any): ReducerState
    EDIT_BROKER_ACCOUNT_DATA(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        setUserBrokerAccounts: (accounts: BrokerAccount[]) => {
            dispatch({ type: "SET_USER_BROKERACCOUNTS", payload: accounts } as DispatchType<ActionNames>)
        },
        addUserBrokerAccounts: (account: BrokerAccount) => {
            dispatch({ type: "ADD_USER_BROKERACCOUNTS", payload: account } as DispatchType<ActionNames>)
        },
        selectBrokerAccount: (account: BrokerAccount) => {
            dispatch({ type: "SELECT_BROKER_ACCOUNT", payload: account } as DispatchType<ActionNames>)
        },
        updateSelectedBrokerAccount: (updates: BrokerAccount) => {
            dispatch({ type: "UPDATE_SELECTED_BROKER_ACCOUNT", payload: updates } as DispatchType<ActionNames>)
        },
        editBrokerAccountData: (view: BrokerAccountWizardViews, navigation: any) => {
            dispatch({ type: "EDIT_BROKER_ACCOUNT_DATA", payload: view } as DispatchType<ActionNames>)
            navigation.navigate(Routes.BROKER_ACCOUNT_WIZARD)
        }
    }
}

export default Actions