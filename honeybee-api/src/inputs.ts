import { Brokers, StockTrackerStatus } from "./enums"
import { BrokerAccountExtraData, ID } from "./types"

export interface StockTrackerInput {
    account?: ID
    brokerAccount?: ID
    strategy?: string
    strategySetting?: StrategySettingInput
    status?: StockTrackerStatus
    frequency?: string
    stockInfo?: ID
}

export interface StrategySettingInput {
    stockAmountLimit?: number
    autoAmountLimit?: boolean
}

export interface BrokerAccountInput {
    account?: ID
    accountName?: string
    brokerCode?: Brokers
    extraData?: BrokerAccountExtraData
    simulation?: boolean
}

export interface ProfileInput {
    name?: string
    nickname?: string
    email?: string
    password?: string
    accounts?: ID[]
    active?: boolean
}