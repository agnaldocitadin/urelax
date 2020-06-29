import { FinancialHistory, StockTracker } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    selectedStockTrackerID?: string
    selectedStockTracker?: StockTracker
    stockTrackerStatements: FinancialHistory[]
}

export type ActionTypes = {
    SELECT_STOCKTRACKER_ID(state: ReducerState, payload: any): ReducerState
    SELECT_STOCKTRACKER(state: ReducerState, payload: any): ReducerState
    ADD_STOCKTRACKER_STATEMENTS(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
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
        }
    }
}

export default Actions