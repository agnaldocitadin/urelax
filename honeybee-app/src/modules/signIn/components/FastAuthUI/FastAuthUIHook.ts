import { useCallback, useEffect, useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { Routes } from "../../../../navigations/Navigator"
import { initStorage, StorageApp } from "../../../storage"
import { FORCE_LOG_IN } from "../../constants"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useFastAuthUIHook = (navigation: NavigationStackProp) => {

    const [ storage, setStorage ] = useState({} as StorageApp)
    const hasCredentials = storage.email && storage.passwd
    const forceLogIn = navigation.getParam(FORCE_LOG_IN)

    const handleAuthFailure = useCallback(() => navigation.navigate(Routes.FastAuthFailureUI), [])
    
    useEffect(() => {
        (async () => {
            const storageApp: StorageApp = await initStorage()
            setStorage(storageApp)

            if (!storageApp.tour) {
                navigation.navigate(Routes.StartupStack)
                return
            }

            if (!forceLogIn && storageApp.keepSession === "no") {
                navigation.navigate(Routes.LogInUI)
                return
            }
        })()
    }, [])

    return {
        storage,
        authenticate: hasCredentials && (storage.keepSession === "yes" || forceLogIn),
        handleAuthFailure
    }
}