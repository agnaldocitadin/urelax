import { useCallback } from "react"
import { useDispatch, useSelector } from "react-redux"
import { animatedCallback } from "../../../../hooks/Commons.hook"
import { States } from "../../../../reducers/Reducer"
import { closeMessage } from "../../actions"

export const useDialogMessageHook = () => {

    const dispatch = useDispatch()
    const { payload, visible } = useSelector((state: States) => state.MESSAGE)

    const handleCloseDialog = useCallback(() => dispatch(closeMessage()), [])

    const handleButtonAction = animatedCallback(async () => {
        payload.buttonAction && await payload.buttonAction()
        if (payload.closeAfterAction) {
            dispatch(closeMessage())
        }
    }, [payload])

    return {
        payload,
        visible,
        handleCloseDialog,
        handleButtonAction
    }
}