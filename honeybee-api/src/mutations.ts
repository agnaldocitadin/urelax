import { gql, mutation } from "./graphql"
import { BrokerAccount, Preferences, StockTracker, UserAccount } from "./types"

export const createUserAccount = (userAccount: UserAccount, fields: string): Promise<UserAccount> => {
    const name = "createUserAccount"
    return gql(name, mutation(name, { userAccount }, fields))
}

export const createStockTracker = (stockTracker: StockTracker, fields: string): Promise<StockTracker> => {
    const name = "createStockTracker"
    const clone = transformStockTracker(stockTracker)
    return gql(name, mutation(name, { stockTracker: clone }, fields))
}

export const createBrokerAccount = (brokerAccount: BrokerAccount, fields: string): Promise<BrokerAccount> => {
    const name = "createBrokerAccount"
    const clone = transformBrokerAccount(brokerAccount)
    return gql(name, mutation(name, { brokerAccount: clone }, fields))
}

export const updateUserAccount = (_id: string, userAccount: UserAccount): Promise<boolean> => {
    const name = "updateUserAccount"
    const transformed = {
        name: userAccount.name,
        nickname: userAccount.nickname,
        passwd: userAccount.passwd,
        email: userAccount.email,
        active: userAccount.active,
        deviceToken: userAccount.deviceToken,
        preferences: userAccount.preferences
    } as UserAccount
    return gql(name, mutation(name, { _id, userAccount: transformed }))
}

export const updateUserPreferences = (_id: string, preferences: Preferences): Promise<boolean> => {
    const name = "updateUserPreferences"
    return gql(name, mutation(name, { _id, preferences }))
}

export const updateBrokerAccount = (_id: string, brokerAccount: BrokerAccount): Promise<boolean> => {
    const name = "updateBrokerAccount"
    return gql(name, mutation(name, { _id, brokerAccount }))
}

export const updateStockTracker = (_id: string, stockTracker: StockTracker): Promise<boolean> => {
    const name = "updateStockTracker"
    const clone = transformStockTracker(stockTracker)
    return gql(name, mutation(name, { _id, stockTracker: clone }))
}

export const activateSimulationAccount = (userAccountId: string): Promise<string> => {
    const name = "activateSimulationAccount"
    return gql(name, mutation(name, { userAccountId }))
}

const transformStockTracker = (tracker: StockTracker): StockTracker => {
    let clone = Object.assign({}, tracker)
    clone.userAccount = <any>clone.userAccount?._id
    clone.stock = <any>clone.stock?._id
    clone.frequency = <any>clone.frequency?._id
    clone.strategy = <any>clone.strategy?._id
    return clone
}

const transformBrokerAccount = (account: BrokerAccount): StockTracker => {
    let clone = Object.assign({}, account)
    clone.userAccount = <any>clone.userAccount?._id
    return clone
}