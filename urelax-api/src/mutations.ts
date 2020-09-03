import { gql, mutation } from "./graphql"
import { BrokerAccountInput, DeviceInput, ProfileInput, StockTrackerInput } from "./inputs"
import { Account, BrokerAccount, StockTracker } from "./types"

export const createBrokerAccount = (input: BrokerAccountInput, fields: string): Promise<BrokerAccount> => {
    const name = "createBrokerAccount"
    return gql(name, mutation(name, { input }, fields))
}

export const updateBrokerAccount = (id: string, input: BrokerAccountInput): Promise<boolean> => {
    const name = "updateBrokerAccount"
    return gql(name, mutation(name, { id, input }))
}

export const updateProfile = (id: string, input: ProfileInput): Promise<boolean> => {
    const name = "updateProfile"
    return gql(name, mutation(name, { id, input }))
}

export const updateAccount = (id: string, input: Account): Promise<boolean> => {
    const name = "updateAccount"
    return gql(name, mutation(name, { id, input }))
}

export const createStockTracker = (input: StockTrackerInput, fields: string): Promise<StockTracker> => {
    const name = "createStockTracker"
    return gql(name, mutation(name, { input }, fields))
}

export const updateStockTracker = (id: string, input: StockTrackerInput): Promise<boolean> => {
    const name = "updateStockTracker"
    return gql(name, mutation(name, { id, input }))
}

export const manageDevice = (id: string, input: DeviceInput): Promise<boolean> => {
    const name = "manageDevice"
    return gql(name, mutation(name, { id, input }))
}