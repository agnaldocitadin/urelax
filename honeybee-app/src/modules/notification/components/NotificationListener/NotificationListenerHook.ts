import { firebase } from "@react-native-firebase/messaging"
import { MessageTypes, NotificationMessage } from "honeybee-api"
import { useEffect } from "react"

export const useNotificationListenerHook = () => {

    useEffect(() => {
        const unsubscribe = firebase.messaging().onMessage(message => {
            let payload: NotificationMessage = <any>message.data

            switch (payload.messageType) {
                case MessageTypes.STOCK_TRACKER_STATUS:
                    console.warn("notification message not implemented yet")
                    break
            }
        })
        return () => unsubscribe()
    }, [])

}