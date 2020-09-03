import { Activity } from "honeybee-api"
import { useDispatch } from "react-redux"
import { DispatchType } from "../AppModuleState"

type ActionNames = keyof ActionTypes

export interface ReducerState {
    selectedActiviy?: Activity
    activities: Activity[]
}

export type ActionTypes = {
    ADD_ACTIVITIES(state: ReducerState, payload: { activities: Activity[], reset: boolean }): ReducerState
    SELECT_ACTIVITY(state: ReducerState, payload: Activity): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()
    return {
        addActivities: (activities: Activity[], reset?: boolean) => {
            dispatch({ type: "ADD_ACTIVITIES", payload: { activities, reset }} as DispatchType<ActionNames>)
        },
        selectActivity: (activity: Activity) => {
            dispatch({ type: "SELECT_ACTIVITY", payload: activity } as DispatchType<ActionNames>)
        }
    }
}

export default Actions