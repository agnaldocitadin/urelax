import { useCallback, useState } from "react"
import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import Navigation from "../../Navigation"
import Storage from "../../Storage"
import { StorageApp } from "../../Storage/actions"

export const useFastAuthFailureUIHook = () => {

    const { switchStack } = Navigation.actions()
    const { initStorage } = Storage.actions()
    const [ tryAgainData, setTryAgainBtn ] = useInteractiveButton({ text: ts("try_again") })
    const [ authenticate, setAuthenticate ] = useState(false)
    const [ storage, setStorage ] = useState<StorageApp>()

    const handleSuccess = useCallback(() => switchStack("app"), [])

    const handleFail = useCallback(() => {
        setAuthenticate(false)
        setTryAgainBtn({ activityState: InteractiveButtonStates.NORMAL })
    }, [])

    const handleTryAgain = animatedCallback(async () => {
        setTryAgainBtn({ activityState: InteractiveButtonStates.PROCESSING })
        const storageApp: StorageApp = await initStorage()
        setStorage(storageApp)
        setAuthenticate(true)
    })

    return {
        authenticate,
        storage,
        tryAgainData,
        handleTryAgain,
        handleSuccess,
        handleFail
    }
}