import { ReduxAction } from "../../src/reducers/Reducer"
import { ACTION_EXAMPLE } from "./actionTypes"

export const actionExample = (data?: string): ReduxAction => ({
    type: ACTION_EXAMPLE,
    data
})