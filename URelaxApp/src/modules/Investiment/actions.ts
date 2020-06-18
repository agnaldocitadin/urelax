import { FinancialHistory } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    selectedEvent?: FinancialHistory
    statements: FinancialHistory[]
}

export type ActionTypes = {
    ADD_HISTORY(state: ReducerState, payload: any): ReducerState
    SELECT_EVENT(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        addHistory: (history: FinancialHistory[], reset?: boolean) => {
            dispatch({ type: "ADD_HISTORY", payload: { history, reset }} as DispatchType<ActionNames>)
        },
        selectEvent: (history: FinancialHistory) => {
            dispatch({ type: "SELECT_EVENT", payload: history } as DispatchType<ActionNames>)
        }
    }
}

export default Actions