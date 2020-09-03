import { firebase } from '@react-native-firebase/messaging'
import { API, MessageTypes, NotificationMessage, Profile } from 'urelax-api'
import { FC, useEffect } from 'react'
import { getUniqueId } from 'react-native-device-info'
import SecurityModule from '../../SecurityModule'

export const NotificationStartup: FC = () => {

    const profile: Profile = SecurityModule.select("profile")

    useEffect(() => {
        if (profile) {
            const unsubscribe = firebase.messaging().onMessage(message => {
                let payload: NotificationMessage = message.data as any
    
                switch (payload.messageType) {
                    case MessageTypes.STOCK_TRACKER_STATUS:
                        // console.warn("notification message not implemented yet")
                        break
    
                    case MessageTypes.STOCK_TRACKER_ORDER:
                        (async () => {
                            // let balanceSummary = await fetchCurrentBalanceSheetByUser(id)
                            // let activity = await fetchLastUserActivity(id)
                            // dispatch(initDashboardData(balanceSummary, history, activity))
                        })()
                        break
                }
            })
            return () => unsubscribe()
        }
    }, [profile])

    useEffect(() => {
        if (profile) {
            (async () => {
                
                // const device = profile.devices?.find(device => device.active)
                // if (device?.deviceId !== getUniqueId()) {
                //     console.debug("----- other device")
                // }
                
                const permit = await firebase.messaging().hasPermission()
                if (permit) {
                    const deviceToken = await firebase.messaging().getToken()
                    API.Profile.manageDevice(profile._id || "", {
                        active: true,
                        deviceId: getUniqueId(),
                        token: deviceToken
                    })
                    return
                }
    
                const permissionGranted = await firebase.messaging().requestPermission()
                if (permissionGranted) {
                    const deviceToken = await firebase.messaging().getToken()
                    API.Profile.manageDevice(profile._id || "", {
                        active: true,
                        deviceId: getUniqueId(),
                        token: deviceToken
                    })
                    return
                }
            })()
        }
    }, [profile])

    return null
}