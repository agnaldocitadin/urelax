import { ts } from "../../core/I18n"
import { Colors, Icons } from "../../core/Theme"
import { ReduxAction } from "../../reducers/Reducer"
import { CLOSE_MESSAGE, SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "./actionTypes"
import { MessageData, MessageType } from "./reducer"

const defMessage: MessageData = {
    buttonLabel: "Ok",
    closeAfterAction: true
}

export const showCustomMessage = (data: MessageData): ReduxAction => ({
    type: SHOW_SUCCESS_MESSAGE,
    data: {
        ...defMessage,
        type: MessageType.CUSTOM,
        icon: Icons.CHECK_CIRCLE,
        iconColor: Colors.BLUES_1,
        ...data
    } as MessageData
})

export const showSuccess = (title: string, message: string, buttonLabel: string = ts("ok"), buttonAction?: Function, closeAfterAction: boolean = true): ReduxAction => ({
    type: SHOW_SUCCESS_MESSAGE,
    data: {
        ...defMessage,
        type: MessageType.SUCCESS,
        title,
        message,
        icon: Icons.CHECK_CIRCLE,
        iconColor: Colors.BLUES_1,
        buttonLabel,
        buttonAction,
        closeAfterAction
    } as MessageData
})

export const showConfirm = (title: string, message: string, buttonAction?: Function, closeAfterAction: boolean = true): ReduxAction => ({
    type: SHOW_SUCCESS_MESSAGE,
    data: {
        ...defMessage,
        type: MessageType.CONFIRMATION,
        title,
        message,
        textColor: Colors.WHITE,
        iconColor: Colors.YELLOW_WARN,
        buttonLabel: ts("yes"),
        buttonAction,
        closeAfterAction
    } as MessageData
})

export const showError = (message: string, title: string = ts("oops"), buttonLabel: string = ts("ok"), buttonAction?: Function, closeAfterAction: boolean = true): ReduxAction => ({
    type: SHOW_ERROR_MESSAGE,
    data: {
        ...defMessage,
        type: MessageType.ERROR,
        title,
        message,
        icon: Icons.HEART_BROKEN,
        textColor: Colors.WHITE,
        iconColor: Colors.RED_ERROR,
        buttonLabel,
        buttonAction,
        closeAfterAction
    } as MessageData
})

export const closeMessage = (): ReduxAction => ({
    type: CLOSE_MESSAGE,
    data: {
        ...defMessage,
        type: MessageType.SUCCESS,
        title: "",
        message: ""
    } as MessageData
})
