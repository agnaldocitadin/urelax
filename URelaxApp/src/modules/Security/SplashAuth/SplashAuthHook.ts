import { useNavigation } from "@react-navigation/native"
import { Profile } from "honeybee-api"
import { useDispatch } from "react-redux"
import Storage from "../../Storage"
import { SplashAuthProps } from './SplashAuth'

export const useSplashAuthHook = ({ keepSession, onSuccess, onFail }: SplashAuthProps) => {

    const { updateDataApp } = Storage.actions()
    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const onAuthenticationSuccess = async (profile: Profile) => {
        try {
            console.log("foi!!", profile)
            await updateDataApp({
                email: profile.email,
                password: profile.password,
                keepSession: keepSession ? "yes" : "no",
                tour: true
            })
    
            // await updateDeviceToken(profile._id)
            // dispatch(registerAuthenticatedUser(profile))
            
            // navigation.navigate(Routes.AppStack)
            onSuccess && onSuccess(profile)
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