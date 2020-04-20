import { BrokerAccount, Brokers } from "honeybee-api"
import { Routes } from "../../navigations/Navigator"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_BROKER_ACCOUNTS, PREPATE_BROKER_ACCOUNT_TO_CREATE, RESET_BROKER_ACCOUNT_MODULE, SELECT_BROKER_ACCOUNT_TO_UPDATE, UPDATE_SELECTED_BROKER_ACCOUNT, UPDATE_SELECTED_EXTRA_DATA } from "./actionTypes"

export interface BrokerState {
    brokerAccounts: BrokerAccount[]
    accountToUpdate: BrokerAccount
    isEditing?: boolean
}

const INITIAL_STATE: BrokerState = {
    brokerAccounts: [],
    accountToUpdate: {},
    isEditing: false
}

export const BrokerReducer = (state: BrokerState = INITIAL_STATE, action: ReduxAction): BrokerState => {
    switch (action.type) {

        case APPEND_BROKER_ACCOUNTS:
            return {
                ...state,
                brokerAccounts: action.data.reset ? action.data.accounts : [...state.brokerAccounts, ...action.data.accounts]
            }

        case SELECT_BROKER_ACCOUNT_TO_UPDATE:
            return {
                ...state,
                accountToUpdate: action.data,
                isEditing: true
            }

        case PREPATE_BROKER_ACCOUNT_TO_CREATE:
            return {
                ...state,
                accountToUpdate: action.data,
                isEditing: false
            }

        case UPDATE_SELECTED_BROKER_ACCOUNT:
            return {
                ...state,
                accountToUpdate: {...state.accountToUpdate, ...action.data},
                brokerAccounts: refreshBrokerAccounts(state, action, state.accountToUpdate._id)
            }

        case UPDATE_SELECTED_EXTRA_DATA:
            return {
                ...state,
                accountToUpdate: {
                    ...state.accountToUpdate, 
                    extraData: {...state.accountToUpdate.extraData, ...action.data}
                },
                brokerAccounts: refreshExtra(state.brokerAccounts, {
                    ...state.accountToUpdate, 
                    extraData: {...state.accountToUpdate.extraData, ...action.data}
                })
            }

        case RESET_BROKER_ACCOUNT_MODULE:
            return {
                ...state,
                ...action.data
            }

        default: return state
    }
}

const refreshExtra = (lista: BrokerAccount[], novo: BrokerAccount) => {
    return lista.map(broker => (broker._id === novo._id) ? {...broker, ...novo} : broker)
}

const refreshBrokerAccounts = (state: BrokerState, action: ReduxAction, id?: string) => {
    const fields: BrokerAccount = action.data
    return state.brokerAccounts.map(broker => (broker._id === id) ? {...broker, ...fields} : broker)
}

export const getRoutes = (brokerCode?: Brokers): string[] => {
    if (!brokerCode) throw "Parameter 'brokerCode' must be provided."
    let fn = staticRoutes[brokerCode]
    return fn() || []
}

export const ClearBrokerRoutes = () => [
    Routes.AccountPreviewUI,
    Routes.AccountDescriptionUI,
    Routes.AccountCpfUI, 
    Routes.AccountBirthdateUI, 
    Routes.AccountSignatureUI, 
    Routes.AccountPasswdUI,
    Routes.AccountReviewUI
]

const staticRoutes: any = []
staticRoutes[Brokers.CLEAR] = ClearBrokerRoutes
// Add new brokers here ...