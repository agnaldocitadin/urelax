import { useCallback } from "react"
import { useDispatch } from "react-redux"
import { animatedCallback } from "../../../core/Commons.hook"
import Actions from "../actions"
import { select } from "../reducer"

export const useDialogMessageHook = () => {

    const dispatch = useDispatch()
    const { close } = Actions()
    const payload = select("payload")
    const visible = select("visible")

    const handleCloseDialog = useCallback(() => close(), [])

    const handleButtonAction = animatedCallback(async () => {
        payload.buttonAction && await payload.buttonAction()
        if (payload.closeAfterAction) {
            close()
        }
    }, [payload])

    return {
        payload,
        visible,
        handleCloseDialog,
        handleButtonAction
    }
}