import { useNavigation } from "@react-navigation/native"
import { Profile } from "honeybee-api"
import { useDispatch } from "react-redux"
import { SplashAuthProps } from './SplashAuth'

export const useSplashAuthHook = ({ keepSession, onSuccess, onFail }: SplashAuthProps) => {

    const navigation = useNavigation()
    const dispatch = useDispatch()
    
    const onAuthenticationSuccess = async (profile: Profile) => {
        try {
            // await updateDataApp({
            //     email: profile.email,
            //     password: profile.password,
            //     keepSession: keepSession ? "yes" : "no",
            //     simulation,
            //     tour: true
            // })
    
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