import { gql, mutation } from "./graphql"
import { BrokerAccountInput, StockTrackerInput } from "./inputs"
import { Account, BrokerAccount, Profile, StockTracker } from "./types"

export const createBrokerAccount = (input: BrokerAccountInput, fields: string): Promise<BrokerAccount> => {
    const name = "createBrokerAccount"
    return gql(name, mutation(name, { input }, fields))
}

export const updateBrokerAccount = (id: string, input: BrokerAccountInput): Promise<boolean> => {
    const name = "updateBrokerAccount"
    return gql(name, mutation(name, { id, input }))
}

export const createProfile = (input: Profile): Promise<Profile> => {
    const name = "createProfile"
    return gql(name, mutation(name, { input }))
}

export const updateProfile = (id: string, input: Profile): Promise<boolean> => {
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