import { firebase } from "@react-native-firebase/messaging"
import { MessageTypes, NotificationMessage } from "honeybee-api"
import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { States } from "../../../../reducers/Reducer"
import { fetchCurrentBalanceSheetByUser, fetchLastUserActivity, initDashboardData } from "../../../dashboard"

export const useNotificationListenerHook = () => {

    const id = useSelector((state: States) => state.SIGNIN.authenticatedUser._id)
    const history = useSelector((state: States) => state.DASHBOARD.balanceHistorySummary)
    const dispatch = useDispatch()

    useEffect(() => {
        const unsubscribe = firebase.messaging().onMessage(message => {
            let payload: NotificationMessage = <any>message.data

            switch (payload.messageType) {
                case MessageTypes.STOCK_TRACKER_STATUS:
                    console.warn("notification message not implemented yet")
                    break

                case MessageTypes.STOCK_TRACKER_ORDER:
                    (async () => {
                        let balanceSummary = await fetchCurrentBalanceSheetByUser(id)
                        let activity = await fetchLastUserActivity(id)
                        dispatch(initDashboardData(balanceSummary, history, activity))
                    })()
                    break
            }
        })
        return () => unsubscribe()
    }, [id, history])

}