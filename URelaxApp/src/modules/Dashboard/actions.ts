import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"
import { FinancialHistoryApp } from "./const"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    history: FinancialHistoryApp[]
}

export type ActionTypes = {
    SET_DASHBOARD_HISTORY(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        setDashboardHistory: (history: FinancialHistoryApp[]) => {
            dispatch({ type: "SET_DASHBOARD_HISTORY", payload: history } as DispatchType<ActionNames>)
        }
    }
}

export default Actions