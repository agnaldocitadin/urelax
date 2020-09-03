export const MODULE_NAME = "Messaging"

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

// export interface MessageState {
//     payload: MessageData
//     visible: boolean
// }