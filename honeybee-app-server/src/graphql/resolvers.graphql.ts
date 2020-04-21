import { ts } from "../core/i18n"
import { stockTrackerPlayground } from "../core/stock.tracker.playground"
import { StockTrackerFactory } from "../factories/stock.tracker.factory"
import { findActivitiesByStockTracker, findActivitiesByUser } from "../services/activity.service"
import { findAllBalanceSheetByUser, findAllBalanceSheetHistoryByUser, findBalanceSheet } from '../services/balance.sheet.service'
import { createBrokerAccount, findBrokerAccount, findBrokerAccountByUser, updateBrokerAccountById } from "../services/broker.account.service"
import { findAllActives, findByCode } from "../services/broker.service"
import { findAvailables as findAvailableStocks } from "../services/stock.service"
import { createNewStockTracker, findActivesByAccount, populateStockTrackerDependencies, runOnCreate, updateStockTrackerById } from "../services/stock.tracker.service"
import { activateSimulationAccount, createAccount, findUserAccountById, updateAccount, updateUserPreferences } from '../services/user.account.service'
import { STFrequencyDef, StockTrackerFrequency } from "../stock-tracker/stock.tracker.frequency"
import { StrategyNames, StrategyNamesDef } from "../strategies/strategy.names"

export const resolvers = {

    // Queries

    fetchAvailableSymbols: () => {
        return findAvailableStocks()
    },

    fetchAvailableStrategies: () => {
        return Object.values(StrategyNames).map((value: StrategyNamesDef) => ({...value, description: ts(value._id) }))
    },

    fetchAvailableFrequencies: () => {
        return Object.values(StockTrackerFrequency).map((value: STFrequencyDef) => ({ _id: value.type, description: ts(value.type) }))
    },

    fetchActiveBrokers: () => {
        return findAllActives()
    },

    fetchBrokerByCode: ({ brokerCode }: any) => {
        return findByCode(brokerCode)
    },

    fetchUserAccountQuery: ({ userAccountId }: any) => {
        return findUserAccountById(userAccountId)
    },

    fetchActiveBeesQuery: async ({ userAccountId }: any) => {
        return findActivesByAccount(userAccountId)
    },

    fetchBrokerAccountQuery: ({ brokerAccountId }: any) => {
        return findBrokerAccount(brokerAccountId)
    },

    fetchBrokerAccountByUserQuery: ({ userAccountId }: any) => {
        return findBrokerAccountByUser(userAccountId)
    },

    fetchBeeActivitiesQuery: ({ beeId, date, page, qty }: any) => {
        return findActivitiesByStockTracker(beeId, page, qty)
    },

    fetchUserActivitiesQuery: ({ userAccountId, date, page, qty }: any) => {
        return findActivitiesByUser(userAccountId, page, qty)
    },

    fetchBalanceSheet: ({ userAccountId, brokerAccountId }: any) => {
        return findBalanceSheet(userAccountId, brokerAccountId)
    },

    fetchBalanceSheetByUserQuery: ({ userAccountId }: any) => {
        return findAllBalanceSheetByUser(userAccountId)
    },

    fetchBalanceSheetHistoriesByUserQuery: ({ userAccountId, date, page, qty, groupBy }: any) => {
        return findAllBalanceSheetHistoryByUser(userAccountId, new Date(date), page, qty, groupBy)
    },

    // Mutations

    createUserAccount: ({ userAccount }: any) => {
        return createAccount(userAccount)
    },

    createBrokerAccount: ({ brokerAccount }: any) => {
        return createBrokerAccount(brokerAccount)
    },

    createBee: async ({ bee }: any) => {
        const beeModel = await createNewStockTracker(bee)
        if (runOnCreate(beeModel)) {
            let investor = StockTrackerFactory.create(beeModel)
            stockTrackerPlayground.addInvestor(investor)
        }
        return populateStockTrackerDependencies(beeModel)
    },

    updateUserAccount: ({ _id, userAccount }: any) => {
        return updateAccount(_id, userAccount)
    },

    updateUserPreferences: ({ _id, preferences }: any) => {
        return updateUserPreferences(_id, preferences)
    },

    updateBrokerAccount: ({ _id, brokerAccount }: any) => {
        return updateBrokerAccountById(_id, brokerAccount)
    },

    updateBee: async ({ _id, bee }: any) => {
        let beeDB = await updateStockTrackerById(_id, bee)
        stockTrackerPlayground.refreshInvestor(beeDB)
        return true
    },

    activateSimulationAccount: ({ userAccountId }: any) => {
        return activateSimulationAccount(userAccountId)
    }
}