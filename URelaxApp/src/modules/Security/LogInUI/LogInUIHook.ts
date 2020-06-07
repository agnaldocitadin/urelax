import { useCallback, useEffect, useState } from "react"
import { Keyboard } from "react-native"
// import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch } from "react-redux"
import { animatedCallback } from "../../../core/Commons.hook"
// import { animatedCallback } from "../../../../hooks/Commons.hook"
// import { States } from "../../../../reducers/Reducer"
// import { showError } from "../../../message"
// import { registerUserEmail, registerUserKeepSession, registerUserPassword, resetSignInForm } from "../../actions"

export const useLogInUIHook = () => {

    const dispatch = useDispatch()
    const [ authenticate, setAuthenticate ] = useState(false)
    const [ keepSession, setKeepSession ] = useState(false)
    const [ email, setEmail ] = useState("")
    const [ password, setPassword ] = useState("")

    const handleAuthentication = animatedCallback(() => {
        console.log("auth...")
        Keyboard.dismiss()
        setAuthenticate(true)
    }, [])

    const handleAuthFail = useCallback((error: any) => {
        console.log("---", error)
        setAuthenticate(false)
    }, [authenticate])

    useEffect(() => {
        return () => {
            // dispatch(resetSignInForm())
        }
    }, [])

    return {
        authenticate,
        email,
        password,
        keepSession,
        disabledLogIn: !email || !password ,//|| !validEmail || !validPassword,
        validEmail: !email ,//|| validEmail,
        validPassword: !password ,//|| validPassword,
        setEmail,
        setPassword,
        setKeepSession,
        handleAuthentication,
        handleAuthFail
    }
}