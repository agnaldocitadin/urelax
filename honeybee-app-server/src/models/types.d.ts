import { StockTrackerStatus } from "../stock-tracker/stock.tracker.status"

export enum Brokers {
    CLEAR = "CLEAR",
}

export enum MessageTypes {
    STOCK_TRACKER_STATUS = "STOCK_TRACKER_STATUS",
}

export type NotificationMessage = {
    messageType: MessageTypes
    stockTrackerId?: string
    stockTrackerStatus?: StockTrackerStatus
}

export type Clear = {
    token: string
    signature: string
    platformUID: string
    sessionId: string
    cpf: string
    passwd: string
    birthdate: Date
}