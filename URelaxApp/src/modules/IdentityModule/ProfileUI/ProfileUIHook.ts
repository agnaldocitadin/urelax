import { API, Profile } from "honeybee-api"
import { useCallback, useState } from "react"
import MessagingModule from "../../MessagingModule"
import SecurityModule from "../../SecurityModule"

export const useProfileUIHook = () => {

    const profile: Profile = SecurityModule.select("profile")
    const [ input, setInput ] = useState(profile)
    const { showAPIError } = MessagingModule.actions()
    const { setProfile } = SecurityModule.actions()

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

    const handleSaveProfile = useCallback(async () => {
        try {
            const { name, nickname, email, password } = input
            if (await API.Profile.updateProfile(profile._id, {
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
            }
        }
        catch(error) {
            console.log(Error)
            showAPIError(error)
        }
    }, [profile, input])

    return {
        input,
        handleFullname,
        handleNickname,
        handleEmail,
        handlePassword,
        handleSaveProfile
    }
}