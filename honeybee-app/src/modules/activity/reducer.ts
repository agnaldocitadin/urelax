import { Activity } from "honeybee-api"
import { ReduxAction } from "../../reducers/Reducer"
import { APPEND_ACTIVITIES, RESET_ACTIVITY_MODULE, SELECT_ACTIVITY } from "./actionTypes"

export interface ActivityState {
    selectedActiviy?: Activity
    activities: Activity[]
}

const INITIAL_STATE: ActivityState = {
    activities: []
}

export const ActivityReducer = (state: ActivityState = INITIAL_STATE, action: ReduxAction): ActivityState => {
    switch (action.type) {

        case SELECT_ACTIVITY:
            return {
                ...state,
                selectedActiviy: action.data
            }

        case APPEND_ACTIVITIES:
            return {
                ...state,
                activities: action.data.reset ? action.data.activities : [...state.activities, ...action.data.activities]
            }

        case RESET_ACTIVITY_MODULE:
            return {
                ...state,
                selectedActiviy: undefined,
                activities: []
            }
            
        default: return state
    }
}
