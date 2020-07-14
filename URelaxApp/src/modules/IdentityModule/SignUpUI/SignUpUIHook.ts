import { Account } from 'honeybee-api'
import { useCallback, useState } from "react"
import { Keyboard } from "react-native"
import { useDispatch } from "react-redux"
import { animatedPromise } from '../../../core/Commons.hook'

export const useSignUpUIHook = () => {

    const dispatch = useDispatch()
    const [ account, setAccount ] = useState({} as Account)
    const [ authenticate, setAuthenticate ] = useState(false)
    const [ passwordMatch, setPasswordMatch ] = useState("")

    const handleFullnameChanges = (chars: string) => setAccount(old => ({...old, name: chars }))
    
    const handleNicknameChanges = (chars: string) => setAccount(old => ({...old, nickname: chars }))

    const handleEmailChanges = (chars: string) => setAccount(old => ({...old, email: chars }))

    const handlePasswdChanges = (chars: string) => setAccount(old => ({...old, passwd: chars }))

    const handleConfirmPasswdChanges = (chars: string) => setPasswordMatch(chars)

    const handleSignInFailure = useCallback(() => {
        // navigation.navigate(Routes.FastAuthUI)
        // dispatch(showError(ts("sign_up_auth_error")))
    }, [])

    const handleSignUp = () => animatedPromise(async () => {
        try {
            Keyboard.dismiss()
            // await createUserAccount(account)
            setAuthenticate(true)
        }
        catch(e) {
            // dispatch(showAPIError(e))
        }
    })

    return {
        account,
        authenticate,
        passwordMatch,
        formFilled: false, //account.name && account.nickname && account.email && account.passwd,
        validFullname: false, //validations.validateFullName(account.name),
        validNickname: false, //!account.nickname || account.nickname.length >= 3,
        validPassword: false, //validations.validatePassword(account.passwd),
        validEmail: false, //validations.validateEmail(account.email),
        validPwdConfirm: false, //!account.passwd || account.passwd === passwordMatch,
        handleFullnameChanges,
        handleNicknameChanges,
        handleEmailChanges,
        handlePasswdChanges,
        handleConfirmPasswdChanges,
        handleSignUp,
        handleSignInFailure
    }
}