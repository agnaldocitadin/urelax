import { FinancialSummary } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    history: FinancialSummary[]
}

export type ActionTypes = {
    SET_DASHBOARD_HISTORY(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        setDashboardHistory: (history: FinancialSummary[]) => {
            dispatch({ type: "SET_DASHBOARD_HISTORY", payload: history } as DispatchType<ActionNames>)
        }
    }
}

export default Actions