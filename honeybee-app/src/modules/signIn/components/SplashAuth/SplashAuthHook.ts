import { UserAccount } from "honeybee-api"
import { useDispatch } from "react-redux"
import { Routes } from "../../../../navigations/Navigator"
import { updateDeviceToken } from "../../../notification"
import { updateDataApp } from "../../../storage"
import { registerAuthenticatedUser } from "../../actions"
import { SplashAuthProps } from './SplashAuth'

/**
 *
 *
 * @param {SplashAuthProps} { keepSession, simulation, navigation, onSuccess, onFail }
 * @returns
 */
export const useSplashAuthHook = ({ keepSession, simulation, navigation, onSuccess, onFail }: SplashAuthProps) => {

    const dispatch = useDispatch()
    
    const onAuthenticationSuccess = async (account: UserAccount) => {
        try {
            await updateDataApp({
                email: account.email,
                passwd: account.passwd,
                keepSession: keepSession ? "yes" : "no",
                simulation,
                tour: true
            })
    
            await updateDeviceToken(account._id)
            dispatch(registerAuthenticatedUser(account))
            
            navigation.navigate(Routes.AppStack)
            onSuccess && onSuccess(account)
        }
        catch(error) {
            onFail && onFail(error)
        }
    }

    const onAuthenticationFail = (error: any) => {
        onFail && onFail(error)
    }

    return {
        onAuthenticationSuccess,
        onAuthenticationFail
    }
}