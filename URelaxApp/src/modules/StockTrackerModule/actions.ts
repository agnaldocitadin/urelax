import { useNavigation } from "@react-navigation/native"
import { FinancialHistory, Frequency, StockTracker, Strategy } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"
import { Routes } from "../NavigationModule/const"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    selectedStockTrackerID?: string
    selectedStockTracker?: StockTracker
    stockTrackerStatements: FinancialHistory[]
    frequencies?: Frequency[]
    strategies?: Strategy[]
    edit?: boolean
    viewToEdit?: string
}

export type ActionTypes = {
    SELECT_STOCKTRACKER_ID(state: ReducerState, payload: any): ReducerState
    SELECT_STOCKTRACKER(state: ReducerState, payload: any): ReducerState
    UPDATE_SELECTED_STOCKTRACKER(state: ReducerState, payload: any): ReducerState
    ADD_STOCKTRACKER_STATEMENTS(state: ReducerState, payload: any): ReducerState
    SET_STRATEGIES(state: ReducerState, payload: any): ReducerState
    SET_FREQUENCIES(state: ReducerState, payload: any): ReducerState
    EDIT_FREQUENCY(state: ReducerState, payload: any): ReducerState
    EDIT_STRATEGY(state: ReducerState, payload: any): ReducerState
    EDIT_TRANSACTION(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const navigation = useNavigation()
    const dispatch = useDispatch()
    return {
        selectStockTrackerID: (id: string) => {
            dispatch({ type: "SELECT_STOCKTRACKER_ID", payload: id } as DispatchType<ActionNames>)
        },
        selectStockTracker: (stockTracker: StockTracker) => {
            dispatch({ type: "SELECT_STOCKTRACKER", payload: stockTracker } as DispatchType<ActionNames>)
        },
        addStockTrackerStatements: (statements: FinancialHistory[], reset?: boolean) => {
            dispatch({ type: "ADD_STOCKTRACKER_STATEMENTS", payload: { statements, reset } } as DispatchType<ActionNames>)
        },
        updateSelectedStockTracker: (updates: StockTracker) => {
            dispatch({ type: "UPDATE_SELECTED_STOCKTRACKER", payload: updates } as DispatchType<ActionNames>)
        },
        setStrategies: (strategies: Strategy[]) => {
            dispatch({ type: "SET_STRATEGIES", payload: strategies } as DispatchType<ActionNames>)
        },
        setFrequencies: (frequencies: Frequency[]) => {
            dispatch({ type: "SET_FREQUENCIES", payload: frequencies } as DispatchType<ActionNames>)
        },
        editFrequency: () => {
            dispatch({ type: "EDIT_FREQUENCY" } as DispatchType<ActionNames>)
            navigation.navigate(Routes.STOCKTRACKER_WIZARD)
        },
        editStrategy: () => {
            dispatch({ type: "EDIT_STRATEGY" } as DispatchType<ActionNames>)
            navigation.navigate(Routes.STOCKTRACKER_WIZARD)
        },
        editTransaction: () => {
            dispatch({ type: "EDIT_TRANSACTION" } as DispatchType<ActionNames>)
            navigation.navigate(Routes.STOCKTRACKER_WIZARD)
        }
    }
}

export default Actions