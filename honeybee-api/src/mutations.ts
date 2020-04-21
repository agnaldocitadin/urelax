import { gql, mutation } from "./graphql"
import { BrokerAccount, Preferences, StockTracker, UserAccount } from "./types"

export const createUserAccount = (userAccount: UserAccount, fields: string): Promise<UserAccount> => {
    const name = "createUserAccount"
    return gql(name, mutation(name, { userAccount }, fields))
}

export const createBee = (bee: StockTracker, fields: string): Promise<StockTracker> => {
    const name = "createBee"
    const clone = transformStockTracker(bee)
    return gql(name, mutation(name, { bee: clone }, fields))
}

export const createBrokerAccount = (brokerAccount: BrokerAccount, fields: string): Promise<BrokerAccount> => {
    const name = "createBrokerAccount"
    return gql(name, mutation(name, { brokerAccount }, fields))
}

export const updateUserAccount = (_id: string, userAccount: UserAccount): Promise<boolean> => {
    const name = "updateUserAccount"
    return gql(name, mutation(name, { _id, userAccount }))
}

export const updateUserPreferences = (_id: string, preferences: Preferences): Promise<boolean> => {
    const name = "updateUserPreferences"
    return gql(name, mutation(name, { _id, preferences }))
}

export const updateBrokerAccount = (_id: string, brokerAccount: BrokerAccount): Promise<boolean> => {
    const name = "updateBrokerAccount"
    return gql(name, mutation(name, { _id, brokerAccount }))
}

export const updateBee = (_id: string, bee: StockTracker): Promise<boolean> => {
    const name = "updateBee"
    const clone = transformStockTracker(bee)
    return gql(name, mutation(name, { _id, bee: clone }))
}

export const activateSimulationAccount = (userAccountId: string): Promise<string> => {
    const name = "activateSimulationAccount"
    return gql(name, mutation(name, { userAccountId }))
}

const transformStockTracker = (tracker: StockTracker): StockTracker => {
    let stockTrackerClone = Object.assign({}, tracker)
    stockTrackerClone.userAccount = <any>stockTrackerClone.userAccount?._id
    stockTrackerClone.stock = <any>stockTrackerClone.stock?._id
    stockTrackerClone.frequency = <any>stockTrackerClone.frequency?._id
    stockTrackerClone.strategy = <any>stockTrackerClone.strategy?._id
    return stockTrackerClone
}