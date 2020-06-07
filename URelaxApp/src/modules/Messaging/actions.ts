import { APIError } from "honeybee-api"
import { useDispatch } from "react-redux"
import { ts } from "../../core/I18n"
import { Colors, Icons } from "../../theming"
import { DispatchType } from "../AppModuleState"
import { MessageData, MessageType } from "./const"

type ActionNames = keyof ActionTypes

const defMessage: MessageData = {
    buttonLabel: "Ok",
    closeAfterAction: true
}

export interface ReducerState {
    payload: MessageData
    visible: boolean
}

export type ActionTypes = {
    SHOW_SUCCESS_MESSAGE(state: ReducerState, payload: any): ReducerState
    SHOW_CONFIRMATION_MESSAGE(state: ReducerState, payload: any): ReducerState
    SHOW_ERROR_MESSAGE(state: ReducerState, payload: any): ReducerState
    CLOSE_MESSAGE(state: ReducerState, payload: any): ReducerState
}

const Actions = () => {
    const dispatch = useDispatch()

    const showError = (message: string, title: string = ts("oops"), buttonLabel: string = ts("ok"), buttonAction?: Function, closeAfterAction: boolean = true) => {
        dispatch({ type: "SHOW_ERROR_MESSAGE", payload: {
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
        }} as DispatchType<ActionNames>)
    }

    return {
        showCustomMessage: (data: MessageData) => {
            dispatch({ type: "SHOW_SUCCESS_MESSAGE", payload: {
                ...defMessage,
                type: MessageType.CUSTOM,
                icon: Icons.CHECK_CIRCLE,
                iconColor: Colors.BLUES_1,
                ...data
            }} as DispatchType<ActionNames>)
        },

        showSuccess: (title: string, message: string, buttonLabel: string = ts("ok"), buttonAction?: Function, closeAfterAction: boolean = true) => {
            dispatch({ type: "SHOW_SUCCESS_MESSAGE", payload: {
                ...defMessage,
                type: MessageType.SUCCESS,
                title,
                message,
                icon: Icons.CHECK_CIRCLE,
                iconColor: Colors.BLUES_1,
                buttonLabel,
                buttonAction,
                closeAfterAction
            }} as DispatchType<ActionNames>)
        },

        showConfirm: (title: string, message: string, buttonAction?: Function, closeAfterAction: boolean = true) => {
            dispatch({ type: "SHOW_CONFIRMATION_MESSAGE", payload: {
                ...defMessage,
                type: MessageType.CONFIRMATION,
                title,
                message,
                textColor: Colors.WHITE,
                iconColor: Colors.YELLOW_WARN,
                buttonLabel: ts("yes"),
                buttonAction,
                closeAfterAction
            }} as DispatchType<ActionNames>)
        },

        showError,

        close: () => {
            dispatch({ type: "CLOSE_MESSAGE", payload: {
                ...defMessage,
                type: MessageType.SUCCESS,
                title: "",
                message: ""
            }} as DispatchType<ActionNames>)
        },

        showAPIError: (apiError: APIError) => {
            return showError(apiError.message || `ERROR: ${apiError.code}`)
        }
    }
}

export default Actions