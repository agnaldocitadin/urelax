import { ACTION_EXAMPLE } from "./actionTypes"

export const actionExample = (text: string) => ({
    type: ACTION_EXAMPLE,
    payload: { text }
})
