import { validations } from 'js-commons'
import { UserAccount } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { REGISTER_AUTHENTICATED_USER, REGISTER_USER_EMAIL, REGISTER_USER_KEEPSESSION, REGISTER_USER_PASSWORD, RESET_SIGNIN_FORM, SIGNOUT } from "./actionTypes"

export interface SignInState {
    authenticatedUser: UserAccount
    email?: string
    passwd?: string
    validEmail?: boolean
    validPassword?: boolean
    keepSession: boolean
}

const INITIAL_STATE: SignInState = {
    authenticatedUser: {},
    keepSession: false,
    validEmail: false,
    validPassword: false
}

export const SignInReducer = (state: SignInState = INITIAL_STATE, action: ReduxAction): SignInState => {
    switch (action.type) {
        
        case REGISTER_AUTHENTICATED_USER:
            return {
                ...state,
                authenticatedUser: action.data,
            }

        case REGISTER_USER_EMAIL:
            return {
                ...state,
                email: action.data,
                validEmail: validations.validateEmail(action.data)
            }

        case REGISTER_USER_PASSWORD:
            return {
                ...state,
                passwd: action.data,
                validPassword: validations.validatePassword(action.data)
            }

        case REGISTER_USER_KEEPSESSION:
            return {
                ...state,
                keepSession: action.data
            }

        case RESET_SIGNIN_FORM:
            return {
                ...state,
                email: undefined,
                passwd: undefined,
                keepSession: false,
                validEmail: false,
                validPassword: false
            }

        case SIGNOUT:
            return {
                ...state,
                authenticatedUser: {}
            }

        default: return state
    }
}