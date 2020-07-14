import { Profile } from "honeybee-api"
import Storage from "../../StorageModule"
import { SplashAuthProps } from './SplashAuth'

export const useSplashAuthHook = ({ keepSession, onSuccess, onFail }: SplashAuthProps) => {

    const { updateDataApp } = Storage.actions()
    
    const onAuthenticationSuccess = async (profile: Profile) => {
        try {
            await updateDataApp({
                email: profile.email,
                password: profile.password,
                keepSession: keepSession ? "yes" : "no",
                tour: true
            })
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