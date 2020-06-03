import { useNavigation } from "@react-navigation/native"
import { useCallback, useEffect, useState } from "react"
import Storage from "../../Storage"
import { StorageApp } from "../../Storage/actions"


export const useFastAuthUIHook = () => {

    const navigation = useNavigation()
    const [ storage, setStorage ] = useState<StorageApp>()
    const hasCredentials = storage?.email && storage?.password
    const { initStorage } = Storage.actions()

    const handleAuthFailure = useCallback(() => {
        // navigation.navigate(Routes.FastAuthFailureUI)
    }, [])
    
    useEffect(() => {
        (async () => {
            const storageApp: StorageApp = await initStorage()
            setStorage(storageApp)

            if (!storageApp.tour) {
                // navigation.navigate(Routes.StartupStack)
                return
            }

            if (storageApp.keepSession === "no") {
                navigation.navigate("login")
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