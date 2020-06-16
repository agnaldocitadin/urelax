import { useNavigation } from "@react-navigation/native"
import { Account, Activity } from "honeybee-api"
import { useCallback, useState } from "react"
import ActivityHistory from ".."
import AppConfig from "../../../core/AppConfig"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import { fetchActivities } from "../api"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useActivityListUIHook = () => {

    const [ fail, setFail ] = useState(false)
    const { showAPIError } = Messaging.actions()
    const { addActivities, selectActivity } = ActivityHistory.actions()
    const activities: Activity[] = ActivityHistory.select("activities")
    const account: Account = Identity.select("activeAccount")
    const navigation = useNavigation()

    const handleActivityPress = animatedCallback((activity: Activity) => {
        selectActivity(activity)
        navigation.navigate(Routes.ACTIVITY_LIST)
    })

    const handleRefresh = useCallback(async (reset?: boolean) => {
        try {
            let activities = await fetchActivities(account._id, 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            addActivities(activities, reset)
        }
        catch(error) {
            setFail(true)
        }
    }, [])

    const handleLoadMoreData = useCallback(async (page: number): Promise<Activity[]> => {
        try {
            return await fetchActivities(account._id, page, AppConfig.QTY_INITIAL_ACTIVITIES)
        }
        catch(error) {
            showAPIError(error)
            return Promise.reject()
        }
    }, [])

    useEffectWhenReady(() => handleRefresh(true))

    return {
        activities,
        fail,
        handleRefresh,
        handleLoadMoreData,
        handleActivityPress
    }
}