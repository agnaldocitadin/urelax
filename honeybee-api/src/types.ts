import { Locales, MessageTypes, StockTrackerStatus } from "./Enums"

export type NotificationMessage = {
    messageType: MessageTypes
    stockTrackerId?: string
    stockTrackerStatus?: StockTrackerStatus
}

export type APIError = {
    code: string
    message?: string
}

export type GroupBy = "day" | "week" | "month" | "year"

export interface StockTracker {
    _id?: string
    account: Account
    brokerAccount: BrokerAccount
    strategy: string
    strategySetting: StrategySetting
    status: string
    frequency: string
    lastFrequencyUpdate: Date
    stockInfo: StockInvestimentInfo
    createdAt: Date
    updatedAt: Date
}

export interface StrategySetting {
    stockAmountLimit: number
    autoAmountLimit: boolean
}

export interface Profile {
    _id: string
    name: string
    nickname: string
    email: string
    password: string
    accounts: [Account]
    active: boolean
    createdAt: Date
    updatedAt: Date
}

export interface Preferences {
    language: Locales
    receiveTradeNotification: boolean
    receiveBalanceNotification: boolean
    addStockTrackerPaused: boolean
}

export interface Device {
    deviceId: string
    token: string
    active: boolean
}

export interface Account {
    _id: string
    active: boolean
    simulation: boolean
    devices: [Device]
    preference: Preferences
}

export interface Broker {
    _id: string
    code: string
    name: string
    logo: string
    active: boolean
    investiments: [Investiment]
    createdAt: Date
    updatedAt: Date
}

export interface Investiment {
    _id: string
    type: string
    description: string
    active: boolean
    logo: string
    stock: StockInvestimentInfo
}

export interface StockInvestimentInfo {
    symbol: string
    stockLot: number
}

export interface BrokerAccountExtraData {
    token: string
    signature: string
    platformUID: string
    sessionId: string
    cpf: string
    passwd: string
    birthdate: Date
}

export interface BrokerAccount {
    _id: string
    account: Account
    accountName: string
    brokerCode: string
    extraData: BrokerAccountExtraData
    createdAt: Date
    updatedAt: Date
}

export interface Activity {
    _id: string
    account: [Account]
    activityType: string
    ref: string
    icon: string
    title: string
    details: [ActivityDetail]
    createdAt: Date
}

export interface ActivityDetail {
    title: string
    description: string
    hidden: boolean
}
