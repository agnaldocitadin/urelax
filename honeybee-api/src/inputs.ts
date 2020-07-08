import { StockTrackerStatus } from "./enums"
import { ID } from "./types"

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