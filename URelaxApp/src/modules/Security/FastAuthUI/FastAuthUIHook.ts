import { useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import { Routes } from "../../Navigation/const"
import Storage from "../../Storage"
import { StorageApp } from "../../Storage/actions"
import Navigation from "../../Navigation"

export const useFastAuthUIHook = () => {

    const { switchStack } = Navigation.actions()
    const navigation = useNavigation()
    const [ storage, setStorage ] = useState<StorageApp>()
    const hasCredentials = storage?.email && storage?.password
    const { initStorage } = Storage.actions()

    const handleAuthFailure = useCallback(() => {
        switchStack("authFailure")
    }, [])
    
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
        handleAuthFailure
    }
}