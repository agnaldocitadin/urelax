import { API, Profile } from "honeybee-api"
import { validations } from "js-commons"
import { useCallback, useState } from "react"
import MessagingModule from "../../MessagingModule"
import SecurityModule from "../../SecurityModule"

export const useProfileUIHook = () => {

    const profile: Profile = SecurityModule.select("profile")
    const [ input, setInput ] = useState(profile)
    const { showAPIError, showSuccess } = MessagingModule.actions()
    const { setProfile } = SecurityModule.actions()
    const [ passwordMatch, setPasswordMatch ] = useState(profile.password)

    const update = useCallback((property: keyof Profile, value: any) => {
        setInput(old => ({
            ...old,
            [property]: value
        }))
    }, [input])

    const handleFullname = useCallback((text: string) => update("name", text), [])    
    const handleNickname = useCallback((text: string) => update("nickname", text), [])    
    const handleEmail = useCallback((text: string) => update("email", text), [])    
    const handlePassword = useCallback((text: string) => update("password", text), [])
    const handlePasswordConfirm = useCallback((text: string) => setPasswordMatch(text), [])

    const handleSaveProfile = useCallback(async () => {
        try {
            const { name, nickname, email, password } = input
            if (await API.Profile.updateProfile(profile._id ?? "", {
                    name,
                    nickname,
                    email,
                    password
                })) {
                    
                setProfile({
                    ...profile,
                    name,
                    nickname,
                    email,
                    password
                })

                showSuccess("profile", "salvo com sucesso!")
            }
        }
        catch(error) {
            console.log(Error)
            showAPIError(error)
        }
    }, [profile, input])

    const validFullname = validations.validateFullName(input?.name)
    const validNickname = validations.validateNickname(input?.nickname)
    const validEmail = validations.validateEmail(input?.email)
    const validPassword = validations.validatePassword(input?.password)
    const validPwdConfirm = !passwordMatch || input?.password === passwordMatch
    const formValid = validFullname && validNickname && validEmail && validPassword && validPwdConfirm
    const formFilled = formValid && (input?.name && input?.nickname && input?.email && input?.password && passwordMatch)

    return {
        input,
        passwordMatch,
        validFullname,
        validNickname,
        validEmail,
        validPassword,
        validPwdConfirm,
        formFilled,
        handleFullname,
        handleNickname,
        handleEmail,
        handlePassword,
        handleSaveProfile,
        handlePasswordConfirm
    }
}