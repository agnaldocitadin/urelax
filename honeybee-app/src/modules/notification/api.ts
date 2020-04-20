import { firebase } from "@react-native-firebase/messaging"
import { API } from "honeybee-api"

/**
 *
 *
 * @param {string} [userAccountId]
 */
export const updateDeviceToken = async (userAccountId: string = "") => {
    const permit = await firebase.messaging().hasPermission()
    if (permit) {
        const deviceToken = await firebase.messaging().getToken()
        return API.updateUserAccount(userAccountId, { deviceToken })
    }
}