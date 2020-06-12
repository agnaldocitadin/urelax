import { APIError } from "honeybee-api"
import { useCallback, useState } from "react"
import { Keyboard } from "react-native"
import { animatedCallback } from "../../../core/Commons.hook"
import Messaging from "../../Messaging"
import Navigation from "../../Navigation"
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { ts } from "../../../core/I18n"

export const useLogInUIHook = () => {

    const { switchStack } = Navigation.actions()
    const { showAPIError } = Messaging.actions()
    const [ authenticate, setAuthenticate ] = useState(false)
    const [ keepSession, setKeepSession ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")
    const [ signinBtn ] = useInteractiveButton({ text: ts("sign_in") })

    const handleAuthSuccess = useCallback(() => switchStack("app"), [])

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
        disabledLogIn: !email || !password ,//|| !validEmail || !validPassword,
        validEmail: !email ,//|| validEmail,
        validPassword: !password ,//|| validPassword,
        signinBtn,
        setEmail,
        setPassword,
        setKeepSession,
        handleAuthentication,
        handleAuthSuccess,
        handleAuthFail
    }
}