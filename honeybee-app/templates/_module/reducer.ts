import { ReduxAction } from "../../src/reducers/Reducer"

export interface Template {}

const INITIAL_STATE: Template = {}

export const TemplateReducer = (state: Template = INITIAL_STATE, action: ReduxAction): Template => {
    switch (action.type) {
        default: return state
    }
}
