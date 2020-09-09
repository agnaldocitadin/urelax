import { animatedCallback } from "../../../core/Commons.hook"
import Actions from "../actions"
import { select } from "../reducer"

export const useDialogMessageHook = () => {

    const { close } = Actions()
    const payload = select("payload")
    const visible = select("visible")

    const handleCloseDialog = animatedCallback(() => close())

    const handleButtonAction = animatedCallback(async () => {
        payload.buttonAction && await payload.buttonAction()
        payload.closeAfterAction && close()
    }, [payload])

    return {
        payload,
        visible,
        handleCloseDialog,
        handleButtonAction
    }
}