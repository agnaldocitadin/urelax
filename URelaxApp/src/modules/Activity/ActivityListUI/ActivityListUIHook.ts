import { Activity } from "honeybee-api"
import { useCallback, useState } from "react"
import { useSelector } from "react-redux"
import AppConfig from "../../../core/AppConfig"
import { useEffectWhenReady } from "../../../core/Commons.hook"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useActivityListUIHook = () => {

    // const dispatch = useDispatch()
    const activities = useSelector((state: States) => state.ACTIVITY.activities)
    const id = useSelector((state: States) => state.SIGNIN.authenticatedUser._id || "")
    const [ fail, setFail ] = useState(false)

    const handleActivityPress = animatedCallback((activity: Activity) => {
        dispatch(selectActivity(activity))
        navigation.navigate(Routes.ActivityDetailUI)
    })

    const handleRefresh = useCallback(async () => {
        try {
            let activities = await fetchUserActivitiesQuery(id, 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            dispatch(appendActivities(activities, true))
        }
        catch(error) {
            setFail(true)
        }
    }, [])

    const handleLoadMoreData = useCallback(async (page: number): Promise<Activity[]> => {
        try {
            return await fetchUserActivitiesQuery(id, page, AppConfig.QTY_INITIAL_ACTIVITIES)
        }
        catch(error) {
            dispatch(showAPIError(error))
            return Promise.reject()
        }
    }, [])

    useEffectWhenReady(() => handleRefresh(), () => dispatch(resetActivityModule()))

    return {
        activities,
        fail,
        handleRefresh,
        handleLoadMoreData,
        handleActivityPress
    }
}