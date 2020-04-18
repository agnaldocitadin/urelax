import { gql, mutation } from "./graphql"
import { BrokerAccount, Preferences, StockTracker, UserAccount } from "./types"

export const createUserAccount = (userAccount: UserAccount, fields: string): Promise<UserAccount> => {
    const name = "createUserAccount"
    return gql(name, mutation(name, { userAccount }, fields))
}

export const createBee = (bee: StockTracker, fields: string): Promise<StockTracker> => {
    const name = "createUserAccount"
    return gql(name, mutation(name, { bee }, fields))
}

export const createBrokerAccount = (brokerAccount: BrokerAccount, fields: string): Promise<BrokerAccount> => {
    const name = "createBrokerAccount"
    return gql(name, mutation(name, { brokerAccount }, fields))
}

export const updateUserAccount = (_id: string, userAccount: UserAccount, fields: string): Promise<boolean> => {
    const name = "updateUserAccount"
    return gql(name, mutation(name, { _id, userAccount }, fields))
}

export const updateUserPreferences = (_id: string, preferences: Preferences, fields: string): Promise<boolean> => {
    const name = "updateUserPreferences"
    return gql(name, mutation(name, { _id, preferences }, fields))
}

export const updateBrokerAccount = (_id: string, brokerAccount: BrokerAccount, fields: string): Promise<boolean> => {
    const name = "updateBrokerAccount"
    return gql(name, mutation(name, { _id, brokerAccount }, fields))
}

export const updateBee = (_id: string, bee: StockTracker, fields: string): Promise<boolean> => {
    const name = "updateBee"
    return gql(name, mutation(name, { _id, bee }, fields))
}

export const activateSimulationAccount = (userAccountId: string, fields: string): Promise<string> => {
    const name = "activateSimulationAccount"
    return gql(name, mutation(name, { userAccountId }, fields))
}