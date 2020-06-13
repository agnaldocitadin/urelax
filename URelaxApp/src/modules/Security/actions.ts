import { Profile } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

let TOKEN: string | undefined = undefined

type ActionNames = keyof ActionTypes

export interface ReducerState {
    profile?: Profile
}

export type ActionTypes = {
    SET_PROFILE(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        TOKEN,
        setToken: (token: string) => {
            TOKEN = token
        },
        setProfile: (profile: Profile) => {
            dispatch({ type: "SET_PROFILE",payload: profile } as DispatchType<ActionNames>)
        }
    }
}

export default Actions