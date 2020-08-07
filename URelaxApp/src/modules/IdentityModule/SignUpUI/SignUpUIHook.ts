import { API, ProfileInput } from 'honeybee-api'
import { validations } from 'js-commons'
import { useCallback, useState } from "react"
import { Keyboard } from "react-native"
import { animatedPromise } from '../../../core/Commons.hook'
import MessagingModule from '../../MessagingModule'
import NavigationModule from '../../NavigationModule'

export const useSignUpUIHook = () => {

    const { switchStack } = NavigationModule.actions()
    const { showAPIError } = MessagingModule.actions()
    const [ profile, setProfile ] = useState<ProfileInput>()
    const [ authenticate, setAuthenticate ] = useState(false)
    const [ passwordMatch, setPasswordMatch ] = useState<string>()

    const handleFullnameChanges = (chars: string) => setProfile(old => ({...old, name: chars }))
    
    const handleNicknameChanges = (chars: string) => setProfile(old => ({...old, nickname: chars }))

    const handleEmailChanges = (chars: string) => setProfile(old => ({...old, email: chars }))

    const handlePasswdChanges = (chars: string) => setProfile(old => ({...old, password: chars }))

    const handleConfirmPasswdChanges = (chars: string) => setPasswordMatch(chars)

    const handleSignUpFailure = useCallback(() => { console.log("deu ruim!") }, [])

    const handleSignUpSuccess = useCallback(() => switchStack("app"), [])

    const handleSignUp = () => animatedPromise(async () => {
        try {
            Keyboard.dismiss()
            if (profile) {
                await API.Profile.signup(profile)
                setAuthenticate(true)
            }
        }
        catch(error) {
            showAPIError(error)
        }
    })

    const validFullname = validations.validateFullName(profile?.name)
    const validNickname = validations.validateNickname(profile?.nickname)
    const validEmail = validations.validateEmail(profile?.email)
    const validPassword = validations.validatePassword(profile?.password)
    const validPwdConfirm = !passwordMatch || profile?.password === passwordMatch
    const formFilled = validFullname && validNickname && validEmail && validPassword && validPwdConfirm

    return {
        profile,
        authenticate,
        passwordMatch,
        formFilled,
        validFullname,
        validNickname,
        validPassword,
        validEmail,
        validPwdConfirm,
        handleFullnameChanges,
        handleNicknameChanges,
        handleEmailChanges,
        handlePasswdChanges,
        handleConfirmPasswdChanges,
        handleSignUp,
        handleSignUpFailure,
        handleSignUpSuccess
    }
}