import { ReduxAction } from "../../reducers/Reducer"
import { CLOSE_MESSAGE, SHOW_CONFIRMATION_MESSAGE, SHOW_ERROR_MESSAGE, SHOW_SUCCESS_MESSAGE } from "./actionTypes"

export enum MessageType {
    SUCCESS = "SUCCESS",
    CONFIRMATION = "CONFIRMATION",
    ERROR = "ERROR",
    CUSTOM = "CUSTOM"
}

export interface MessageData {
    type?: MessageType
    title?: string
    message?: string
    icon?: string
    buttonLabel?: string
    closeAfterAction?: boolean
    iconColor?: string
    buttonAction?(): Promise<void|unknown>
}

export interface MessageState {
    payload: MessageData
    visible: boolean
}

const INITIAL_STATE: MessageState = {
    visible: false,
    payload: {
        type: MessageType.SUCCESS,
        title: "",
        message: "",
        closeAfterAction: true
    }
}

export const MessageReducer = (state: MessageState = INITIAL_STATE, action: ReduxAction): MessageState => {
    switch (action.type) {
        case SHOW_SUCCESS_MESSAGE:
            return {
                ...state,
                payload: action.data,
                visible: true
            }

        case SHOW_CONFIRMATION_MESSAGE:
            return {
                ...state,
                payload: action.data,
                visible: true
            }

        case SHOW_ERROR_MESSAGE:
            return {
                ...state,
                payload: action.data,
                visible: true
            }

        case CLOSE_MESSAGE:
            return {
                ...state,
                visible: false
            }

        default: return state
    }
}
