import { FinancialAnalysis, FinancialHistory } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {

    //StatementsUI
    statements: FinancialHistory[]
    selectedEvent?: FinancialHistory 

    // useInvestimentAnalysisUIHook
    analysis: FinancialAnalysis[]
    selectedGraphIndex: number
}

export type ActionTypes = {
    ADD_HISTORY(state: ReducerState, payload: any): ReducerState
    SELECT_EVENT(state: ReducerState, payload: any): ReducerState
    ADD_ANALYSIS(state: ReducerState, payload: any): ReducerState
    SELECT_GRAPH_INDEX(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        addHistory: (history: FinancialHistory[], reset?: boolean) => {
            dispatch({ type: "ADD_HISTORY", payload: { history, reset }} as DispatchType<ActionNames>)
        },
        selectEvent: (history: FinancialHistory) => {
            dispatch({ type: "SELECT_EVENT", payload: history } as DispatchType<ActionNames>)
        },
        addAnalysis: (analysis: FinancialAnalysis[], reset?: boolean) => {
            dispatch({ type: "ADD_ANALYSIS", payload: { analysis, reset }} as DispatchType<ActionNames>)
        },
        selectGraphIndex: (index: number) => {
            dispatch({ type: "SELECT_GRAPH_INDEX", payload: index } as DispatchType<ActionNames>)
        }
    }
}

export default Actions