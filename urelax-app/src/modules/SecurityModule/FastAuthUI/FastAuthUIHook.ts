import { Profile } from 'urelax-api'
import { useCallback, useEffect, useState } from "react"
import NavigationModule from "../../NavigationModule"
import Storage from "../../StorageModule"
import { StorageApp } from "../../StorageModule/actions"

export const useFastAuthUIHook = () => {

    const { switchStack } = NavigationModule.actions()
    const [ storage, setStorage ] = useState<StorageApp>()
    const hasCredentials = storage?.email && storage?.password
    const { initStorage } = Storage.actions()

    const handleAuthFailure = useCallback(() => switchStack("authFailure"), [])

    const handleAuthSuccess = useCallback((profile: Profile) => switchStack("app"), [])
    
    useEffect(() => {
        (async () => {
            const storageApp: StorageApp = await initStorage()
            setStorage(storageApp)

            if (storageApp.keepSession === "no") {
                switchStack("welcome")
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