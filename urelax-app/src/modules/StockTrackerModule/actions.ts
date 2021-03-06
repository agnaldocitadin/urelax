import { useDispatch } from "react-redux"
import { Activity, Frequency, StockTracker, Strategy } from 'urelax-api'
import { DispatchType } from "../AppModuleState"
import { Routes } from "../NavigationModule/const"
import { StockTrackerWizardViews } from "./const"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    selectedStockTrackerID?: string
    selectedStockTracker?: StockTracker
    stockTrackerActivities: Activity[]
    frequencies?: Frequency[]
    strategies?: Strategy[]
    edit?: boolean
    viewToEdit?: string
}

export type ActionTypes = {
    SELECT_STOCKTRACKER_ID(state: ReducerState, payload: any): ReducerState
    SELECT_STOCKTRACKER(state: ReducerState, payload: any): ReducerState
    UPDATE_SELECTED_STOCKTRACKER(state: ReducerState, payload: any): ReducerState
    ADD_STOCKTRACKER_ACTIVITIES(state: ReducerState, payload: any): ReducerState
    SET_STRATEGIES(state: ReducerState, payload: any): ReducerState
    SET_FREQUENCIES(state: ReducerState, payload: any): ReducerState
    EDIT_STOCKTRACKER_DATA(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        selectStockTrackerID: (id: string) => {
            dispatch({ type: "SELECT_STOCKTRACKER_ID", payload: id } as DispatchType<ActionNames>)
        },
        selectStockTracker: (stockTracker?: StockTracker) => {
            dispatch({ type: "SELECT_STOCKTRACKER", payload: stockTracker } as DispatchType<ActionNames>)
        },
        addStockTrackerActivities: (activities: Activity[], reset?: boolean) => {
            dispatch({ type: "ADD_STOCKTRACKER_ACTIVITIES", payload: { activities, reset } } as DispatchType<ActionNames>)
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
        editStockTrackerData: (view: StockTrackerWizardViews, navigation: any) => {
            dispatch({ type: "EDIT_STOCKTRACKER_DATA", payload: view } as DispatchType<ActionNames>)
            navigation.navigate(Routes.STOCKTRACKER_WIZARD)
        }
    }
}

export default Actions