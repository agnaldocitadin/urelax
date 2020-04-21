import { UserAccount } from "honeybee-api"
import { validations } from 'js-commons'
import { useCallback, useState } from "react"
import { Keyboard } from "react-native"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedPromise } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { showError } from "../../../message"
import { createUserAccount } from "../../api"

export const useSignUpUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ account, setAccount ] = useState({} as UserAccount)
    const [ authenticate, setAuthenticate ] = useState(false)
    const [ passwordMatch, setPasswordMatch ] = useState("")

    const handleFullnameChanges = (chars: string) => setAccount(old => ({...old, name: chars }))
    
    const handleNicknameChanges = (chars: string) => setAccount(old => ({...old, nickname: chars }))

    const handleEmailChanges = (chars: string) => setAccount(old => ({...old, email: chars }))

    const handlePasswdChanges = (chars: string) => setAccount(old => ({...old, passwd: chars }))

    const handleConfirmPasswdChanges = (chars: string) => setPasswordMatch(chars)

    const handleSignInFailure = useCallback(() => {
        navigation.navigate(Routes.FastAuthUI)
        dispatch(showError(ts("sign_up_auth_error")))
    }, [])

    const handleSignUp = () => animatedPromise(async () => {
        try {
            Keyboard.dismiss()
            await createUserAccount(account)
            setAuthenticate(true)
        }
        catch(e) {
            dispatch(showError(JSON.stringify(e.message)))
        }
    })

    return {
        account,
        authenticate,
        passwordMatch,
        formFilled: account.name && account.nickname && account.email && account.passwd,
        validFullname: validations.validateFullName(account.name),
        validNickname: !account.nickname || account.nickname.length >= 3,
        validPassword: validations.validatePassword(account.passwd),
        validEmail: validations.validateEmail(account.email),
        validPwdConfirm: !account.passwd || account.passwd === passwordMatch,
        handleFullnameChanges,
        handleNicknameChanges,
        handleEmailChanges,
        handlePasswdChanges,
        handleConfirmPasswdChanges,
        handleSignUp,
        handleSignInFailure
    }
}