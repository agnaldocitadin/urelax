import { gql, mutation } from "./graphql"
import { Account, BrokerAccount, Profile, StockTracker } from "./types"

export const createBrokerAccount = (input: BrokerAccount, fields: string): Promise<BrokerAccount> => {
    const name = "createBrokerAccount"
    return gql(name, mutation(name, { input }, fields))
}

export const updateBrokerAccount = (id: string, input: BrokerAccount): Promise<boolean> => {
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

export const createAccount = (input: Account): Promise<Account> => {
    const name = "createAccount"
    return gql(name, mutation(name, { input }))
}

export const updateAccount = (id: string, input: Account): Promise<boolean> => {
    const name = "updateAccount"
    return gql(name, mutation(name, { id, input }))
}

export const activateSimulationAccount = (profile: string): Promise<string> => {
    const name = "activateSimulationAccount"
    return gql(name, mutation(name, { profile }))
}

export const createStockTracker = (input: StockTracker): Promise<StockTracker> => {
    const name = "createStockTracker"
    return gql(name, mutation(name, { input }))
}

export const updateStockTracker = (id: string, input: StockTracker): Promise<boolean> => {
    const name = "updateStockTracker"
    return gql(name, mutation(name, { id, input }))
}