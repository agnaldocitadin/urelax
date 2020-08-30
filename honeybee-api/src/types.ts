import { Brokers, InvestimentType, MessageTypes, StockTrackerStatus, TransactionType } from "./Enums"

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

export interface ID extends String {}

export interface StockTracker {
    _id?: string
    account?: Account
    brokerAccount?: BrokerAccount
    strategy?: string
    strategySetting?: StrategySetting
    status?: StockTrackerStatus
    frequency?: string
    lastFrequencyUpdate?: Date
    stockInfo?: BrokerInvestiment
    qty?: number
    buyPrice?: number
    createdAt?: Date
    updatedAt?: Date
}

export interface Strategy {
    _id: ID
    description: string
}

export interface Frequency {
    _id: ID
    description: string
}

export interface StrategySetting {
    stockAmountLimit?: number
    autoAmountLimit?: boolean
}

export interface Profile {
    _id?: string
    name?: string
    nickname?: string
    email?: string
    password?: string
    accounts?: Account[]
    activeAccount?: string
    active?: boolean
    devices?: Device[]
    createdAt?: Date
    updatedAt?: Date
}

export interface Preferences {
    language?: string
    receiveBuyNotification?: boolean
    receiveSellNotification?: boolean
    receiveBalanceNotification?: boolean
    addStockTrackerPaused?: boolean
}

export interface Device {
    deviceId?: string
    token?: string
    active?: boolean
}

export interface Account {
    _id?: string
    active?: boolean
    simulation?: boolean
    devices?: Device[]
    preference?: Preferences
}

export interface Broker {
    _id?: string
    code?: string
    name?: string
    logo?: string
    active?: boolean
    createdAt?: Date
    updatedAt?: Date
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
    token?: string
    signature?: string
    platformUID?: string
    sessionId?: string
    cpf?: string
    password?: string
    birthdate?: Date
}

export interface BrokerAccount {
    _id: string
    account: Account
    accountName: string
    brokerCode: Brokers
    extraData: BrokerAccountExtraData
    simulation: boolean
    createdAt: Date
    updatedAt: Date
}

export interface Activity {
    _id: string
    account: Account
    activityType: string
    ref: string
    icon: string
    title: string
    details: ActivityDetail[]
    createdAt: Date
}

export interface ActivityDetail {
    title: string
    description: string
    hidden: boolean
}

export interface StockInvestimentInfo {
    symbol: string
    stockLot: number
}

export interface BrokerInvestiment {
    _id: string
    brokerCode: String
    type: InvestimentType
    description: string
    active: boolean
    logo: string
    stock: StockInvestimentInfo
}

export interface FinancialSummary {
    when: string
    patrimony: number
    variation: number
}

export interface Transaction {
    dateTime: Date
    type: TransactionType
    value: number
    investiment: BrokerInvestiment
}

export interface AppliedInvestiment {
    brokerAccountName: string
    investiment: BrokerInvestiment
    refID: string
    qty: number
    amount: number
}

// Corresponde 1 barra do gráfico
export interface FinancialAnalysis {
    label: string
    amount: number
    variation: number
    items: FinancialAnalysisItem[]
}

// Corresponde as movimentações de cada investimento de 1 barra do grafico
export interface FinancialAnalysisItem {
    refID: string
    investiment: BrokerInvestiment
    amount: number
    variation: number
}