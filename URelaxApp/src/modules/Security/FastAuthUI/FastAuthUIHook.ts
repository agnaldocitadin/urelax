import { useNavigation } from "@react-navigation/native"
import { Profile } from "honeybee-api"
import { useCallback, useEffect, useState } from "react"
import Navigation from "../../Navigation"
import { Routes } from "../../Navigation/const"
import Storage from "../../Storage"
import { StorageApp } from "../../Storage/actions"

export const useFastAuthUIHook = () => {

    const { switchStack } = Navigation.actions()
    const navigation = useNavigation()
    const [ storage, setStorage ] = useState<StorageApp>()
    const hasCredentials = storage?.email && storage?.password
    const { initStorage } = Storage.actions()

    const handleAuthFailure = useCallback(() => switchStack("authFailure"), [])

    const handleAuthSuccess = useCallback((profile: Profile) => switchStack("app"), [])
    
    useEffect(() => {
        (async () => {
            const storageApp: StorageApp = await initStorage()
            setStorage(storageApp)

            if (!storageApp.tour) {
                switchStack("welcome")
                return
            }

            if (storageApp.keepSession === "no") {
                switchStack("welcome")
                navigation.navigate(Routes.SIGNIN)
                return
            }
        })()
    }, [])

    return {
        storage,
        authenticate: Boolean(hasCredentials && storage?.keepSession === "yes"),
        handleAuthSuccess,
        handleAuthFailure
    }
}