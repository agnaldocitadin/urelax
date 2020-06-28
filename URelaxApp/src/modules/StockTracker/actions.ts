import { StockTracker } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    selectedStockTrackerID?: string
    selectedStockTracker?: StockTracker
}

export type ActionTypes = {
    SELECT_STOCKTRACKER_ID(state: ReducerState, payload: any): ReducerState
    SELECT_STOCKTRACKER(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        selectStockTrackerID: (id: string) => {
            dispatch({ type: "SELECT_STOCKTRACKER_ID", payload: id } as DispatchType<ActionNames>)
        },
        selectStockTracker: (stockTracker: StockTracker) => {
            dispatch({ type: "SELECT_STOCKTRACKER", payload: stockTracker } as DispatchType<ActionNames>)
        }
    }
}

export default Actions