import { UserAccount } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { CHANGE_ACCOUNT_DATA, RESET_ACCOUNT_MODULE, SELECT_ACCOUNT_TO_UPDATE } from "./actionTypes"

export interface AccountState {
    accountToUpdate?: UserAccount
}

const INITIAL_STATE: AccountState = {}

export const AccountReducer = (state: AccountState = INITIAL_STATE, action: ReduxAction): AccountState => {
    switch (action.type) {
        case SELECT_ACCOUNT_TO_UPDATE:
            return {
                ...state,
                accountToUpdate: action.data
            }

        case CHANGE_ACCOUNT_DATA:
            return {
                ...state,
                accountToUpdate: {...state.accountToUpdate, ...action.data}
            }

        case RESET_ACCOUNT_MODULE:
            return {
                ...state,
                accountToUpdate: undefined
            }

        default: return state
    }
}
