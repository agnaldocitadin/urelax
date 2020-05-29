let TOKEN: string | undefined = undefined

type ActionNames = keyof ActionTypes

export interface ReducerState {}

export type ActionTypes = {}

const Actions = () => {
    return {
        TOKEN,
        setToken: (token: string) => {
            TOKEN = token
        }
    }
}

export default Actions