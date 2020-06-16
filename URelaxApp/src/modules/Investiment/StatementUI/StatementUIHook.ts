import { FinancialHistory } from "honeybee-api"
import { useCallback } from "react"
import AppConfig from "../../../core/AppConfig"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { fetchFinancialHistory } from "../api"

export const useStatementUIHook = () => {

    const { showAPIError } = Messaging.actions()
    const account = Identity.select("activeAccount")
    const history: FinancialHistory[] = []

    const handleEventPress = animatedCallback((event: FinancialHistory) => {
        // selectActivity(activity)
        // navigation.navigate(Routes.ACTIVITY_LIST)
    })

    const handleRefresh = useCallback(async (reset?: boolean) => {
        try {
            let activities = await fetchFinancialHistory(account._id, 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            // addActivities(activities, reset)
        }
        catch(error) {
            // setFail(true)
        }
    }, [])

    const handleLoadMoreData = useCallback(async (page: number) => {
        try {
            return await fetchFinancialHistory(account._id, page, AppConfig.QTY_INITIAL_ACTIVITIES)
        }
        catch(error) {
            showAPIError(error)
        }
    }, [])

    useEffectWhenReady(() => handleRefresh(true))

    return {
        history,
        handleEventPress,
        handleRefresh,
        handleLoadMoreData
    }
}