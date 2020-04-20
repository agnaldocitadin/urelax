import { UserAccount } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { REGISTER_AUTHENTICATED_USER, REGISTER_USER_EMAIL, REGISTER_USER_KEEPSESSION, REGISTER_USER_PASSWORD, RESET_SIGNIN_FORM, SIGNOUT } from "./actionTypes"

export const registerAuthenticatedUser = (account: UserAccount): ReduxAction => ({
    type: REGISTER_AUTHENTICATED_USER,
    data: account
})

export const registerUserEmail = (data?: string): ReduxAction => ({
    type: REGISTER_USER_EMAIL,
    data
})

export const registerUserPassword = (data?: string): ReduxAction => ({
    type: REGISTER_USER_PASSWORD,
    data
})

export const registerUserKeepSession = (data?: boolean): ReduxAction => ({
    type: REGISTER_USER_KEEPSESSION,
    data
})

export const resetSignInForm = (): ReduxAction => ({
    type: RESET_SIGNIN_FORM,
    data: null
})

export const signout = (): ReduxAction => ({
    type: SIGNOUT,
    data: null
})