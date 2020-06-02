import { useCallback, useEffect, useState } from "react"
import Storage from "../../Storage"
import { StorageApp } from "../../Storage/actions"


export const useFastAuthUIHook = () => {

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
                // navigation.navigate(Routes.LogInUI)
                return
            }
        })()
    }, [])

    return {
        storage,
        authenticate: hasCredentials && storage?.keepSession === "yes",
        handleAuthFailure
    }
}