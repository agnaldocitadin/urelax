import { useCallback, useEffect, useState } from "react"
import { Keyboard } from "react-native"
// import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
// import { animatedCallback } from "../../../../hooks/Commons.hook"
// import { States } from "../../../../reducers/Reducer"
// import { showError } from "../../../message"
// import { registerUserEmail, registerUserKeepSession, registerUserPassword, resetSignInForm } from "../../actions"

export const useLogInUIHook = () => {

    const dispatch = useDispatch()
    const [ authenticate, setAuthenticate ] = useState(false)
    
    const { 
        email, 
        passwd, 
        keepSession, 
        validEmail, 
        validPassword 
    } = useSelector((state: States) => state.SIGNIN)

    const handleKeepSessionChange = useCallback((value: boolean) => dispatch(registerUserKeepSession(value)), [keepSession])

    const handleEmailChanges = useCallback((chars: string) => dispatch(registerUserEmail(chars)), [email])
    
    const handlePasswdChanges = useCallback((chars: string) => dispatch(registerUserPassword(chars)), [passwd])
    
    const handleAuthentication = animatedCallback(() => {
        Keyboard.dismiss()
        setAuthenticate(true)
    }, [])

    const handleAuthFail = useCallback((error: any) => {
        dispatch(showError(JSON.stringify(error.message)))
        setAuthenticate(false)
    }, [authenticate])

    useEffect(() => {
        return () => {
            dispatch(resetSignInForm())
        }
    }, [])

    return {
        authenticate,
        email,
        passwd,
        keepSession,
        disabledLogIn: !email || !passwd || !validEmail || !validPassword,
        validEmail: !email || validEmail,
        validPassword: !passwd || validPassword,
        handleEmailChanges,
        handlePasswdChanges,
        handleAuthentication,
        handleKeepSessionChange,
        handleAuthFail
    }
}