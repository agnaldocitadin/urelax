import { BrokerAccount, BrokerAccountExtraData, UserAccount } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_BROKER_ACCOUNTS, PREPATE_BROKER_ACCOUNT_TO_CREATE, RESET_BROKER_ACCOUNT_MODULE, SELECT_BROKER_ACCOUNT_TO_UPDATE, UPDATE_SELECTED_BROKER_ACCOUNT, UPDATE_SELECTED_EXTRA_DATA } from "./actionTypes"
import { BrokerState } from "./reducer"

export const appendBrokerAccounts = (accounts: BrokerAccount[], reset: boolean = false): ReduxAction => ({
    type: APPEND_BROKER_ACCOUNTS,
    data: {
        accounts,
        reset
    }
})

export const selectBrokerAccountToUpdate = (account: BrokerAccount): ReduxAction => ({
    type: SELECT_BROKER_ACCOUNT_TO_UPDATE,
    data: account
})

export const prepateBrokerAccountToCreate = (user: UserAccount): ReduxAction => ({
    type: PREPATE_BROKER_ACCOUNT_TO_CREATE,
    data: { userAccount: user, extraData: {} } as BrokerAccount
})

export const updateSelectedBrokerAccount = (account: BrokerAccount): ReduxAction => ({
    type: UPDATE_SELECTED_BROKER_ACCOUNT,
    data: account
})

export const updateSelectedExtraData = (extraData: BrokerAccountExtraData): ReduxAction => ({
    type: UPDATE_SELECTED_EXTRA_DATA,
    data: extraData
})

export const resetBrokerAccountModule = (): ReduxAction => ({
    type: RESET_BROKER_ACCOUNT_MODULE,
    data: {
        brokerAccounts: [],
        accountToUpdate: {},
        isEditing: false
    } as BrokerState
})