import { Activity } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_ACTIVITIES, RESET_ACTIVITY_MODULE, SELECT_ACTIVITY } from "./actionTypes"

export const selectActivity = (activity: Activity): ReduxAction => ({
    type: SELECT_ACTIVITY,
    data: activity
})

export const appendActivities = (activities: Activity[], reset: boolean): ReduxAction => ({
    type: APPEND_ACTIVITIES,
    data: {
        activities,
        reset
    }
})

export const resetActivityModule = (): ReduxAction => ({
    type: RESET_ACTIVITY_MODULE,
    data: null
})
