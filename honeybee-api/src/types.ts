import { Brokers, MessageTypes, StockTrackerStatus } from "./Enums"

export type GroupBy = "day" | "week" | "month" | "year"

export interface Preferences {
    receiveTradeNotification: boolean
    receiveBalanceNotification: boolean
    addStockTrackerPaused: boolean
}

export interface UserAccount {
    _id?: string
    name?: string
    nickname?: string
    passwd?: string
    email?: string
    active?: boolean
    deviceToken?: string
    simulation?: boolean
    simulationAccountId?: string
    preferences?: Preferences
    createdAt?: Date
}

export interface Broker {
    _id?: string
    code?: string
    name?: string
    logo?: string
    active?: boolean
}

export interface Stock {
    _id?: string
    symbol?: string
    description?: string
    active?: boolean
    stockLot?: number
}

export interface StockTracker {
    _id?: string
    userAccount?: UserAccount
    brokerAccount?: BrokerAccount
    strategy?: Strategy
    stock?: Stock
    status?: string
    active?: boolean
    frequency?: Frequency
    stockAmountLimit?: number
    autoAmountLimit?: boolean
    createdAt?: Date
}

export interface Strategy {
    _id?: string
    description?: string
    file?: string
    impl?: string
}

export interface Activity {
    _id?: string
    userAccount: UserAccount
    activityType: string
    ref: string
    icon: string
    dateTime: Date
    title: string
    details: ActivityDetail[]
}

export interface ActivityDetail {
    title: string
    description: string
    hidden: boolean
}

export interface Frequency {
    _id?: string
    description?: string
}

export interface StockSheet {
    symbol: string
    qty: number
    averagePrice: number
}

export interface BalanceSheet {
    _id: string
    userAccount: UserAccount
    brokerAccount: any //FIXME
    createdAt: Date
    initialAmount: number
    currentAmount: number
    stocks: StockSheet[]
}

export interface BalanceSheetSummary {
    amount?: number
    amountVariation?: number
    credits?: number
    creditVariation?: number
    stocks?: number
    stockVariation?: number
}

export interface BalanceSheetHistorySummary {
    label?: string
    amount?: number
    amountVariation?: number
    credits?: number
    creditVariation?: number
    stocks?: number
    stockVariation?: number
}

export interface BrokerAccount {
    _id?: string
    userAccount?: UserAccount
    accountName?: string
    initialAmount?: number
    brokerCode?: Brokers
    extraData?: BrokerAccountExtraData
    createdAt?: Date
}

export interface BrokerAccountExtraData {
    token?: string
    signature?: string
    platformUID?: string
    sessionId?: string
    cpf?: string
    passwd?: string
    birthdate?: Date
}

export interface NotificationMessage {
    messageType: MessageTypes
    stockTrackerId?: string
    stockTrackerStatus?: StockTrackerStatus
}