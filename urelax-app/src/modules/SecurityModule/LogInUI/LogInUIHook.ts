import { useCallback, useState } from "react"
import { Keyboard } from "react-native"
import { APIError, Profile } from 'urelax-api'
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import Messaging from "../../MessagingModule"
import NavigationModule from "../../NavigationModule"

export const useLogInUIHook = () => {

    const { switchStack } = NavigationModule.actions()
    const { showAPIError } = Messaging.actions()
    const [ authenticate, setAuthenticate ] = useState(false)
    const [ keepSession, setKeepSession ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ signinBtn ] = useInteractiveButton({ text: ts("sign_in") })

    const handleAuthSuccess = useCallback((profile: Profile) => switchStack("app"), [])

    const handleAuthentication = animatedCallback(() => {
        Keyboard.dismiss()
        setAuthenticate(true)
    }, [])

    const handleAuthFail = useCallback((error: APIError) => {
        setAuthenticate(false)
        showAPIError(error)
    }, [authenticate])
    
    return {
        authenticate,
        email,
        password,
        keepSession,
        disabledLogIn: !email || !password,
        signinBtn,
        setEmail,
        setPassword,
        setKeepSession,
        handleAuthentication,
        handleAuthSuccess,
        handleAuthFail
    }
}