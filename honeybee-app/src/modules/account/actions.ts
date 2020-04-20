import { UserAccount } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { CHANGE_ACCOUNT_DATA, RESET_ACCOUNT_MODULE, SELECT_ACCOUNT_TO_UPDATE } from "./actionTypes"

export const selectAccountToUpdate = (account: UserAccount): ReduxAction => ({
    type: SELECT_ACCOUNT_TO_UPDATE,
    data: account
})

export const changeAccountData = (account: UserAccount): ReduxAction => ({
    type: CHANGE_ACCOUNT_DATA,
    data: account
})

export const resetAccountModule = (): ReduxAction => ({
    type: RESET_ACCOUNT_MODULE,
    data: null
})
