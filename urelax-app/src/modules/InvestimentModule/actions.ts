import { useDispatch } from "react-redux"
import { AppliedInvestiment, FinancialAnalysis, FinancialHistory } from 'urelax-api'
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

type Investiments = {
    patrimony?: number,
    currency?: AppliedInvestiment[]
    stocks?: AppliedInvestiment[]
}

export interface ReducerState {

    //StatementsUI
    statements: FinancialHistory[]
    selectedEvent?: FinancialHistory 

    // useInvestimentAnalysisUIHook
    analysis: FinancialAnalysis[]
    selectedGraphIndex: number
    appliedInvestiments: Investiments
}

export type ActionTypes = {
    ADD_APPLIED_INVESTIMENTS(state: ReducerState, payload: any): ReducerState
    REMOVE_APPLIED_INVESTIMENTS(state: ReducerState, payload: any): ReducerState
    ADD_HISTORY(state: ReducerState, payload: any): ReducerState
    SELECT_EVENT(state: ReducerState, payload: any): ReducerState
    ADD_ANALYSIS(state: ReducerState, payload: any): ReducerState
    SELECT_GRAPH_INDEX(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        addAppliedInvestiment: (investiments: Investiments, reset?: boolean) => {
            dispatch({ type: "ADD_APPLIED_INVESTIMENTS", payload: { investiments, reset }} as DispatchType<ActionNames>)
        },
        removeAppliedInvestiment: (refId?: string) => {
            dispatch({ type: "REMOVE_APPLIED_INVESTIMENTS", payload: { refId }} as DispatchType<ActionNames>)
        },
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