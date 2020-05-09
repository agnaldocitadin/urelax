import { ts } from "../core/i18n"
import { stockTrackerPlayground } from "../core/stock.tracker.playground"
import { StockTrackerFactory } from "../modules/Stock/tracker/stock.tracker.factory"
import { findActivitiesByStockTracker, findActivitiesByAccount } from "../modules/Activity/services/activity.service"
import { findAllBalanceSheetByUser, findAllBalanceSheetHistoryByUser, findBalanceSheet } from '../services/balance.sheet.service'
import { createBrokerAccount, findBrokerAccount, findBrokerAccountByUser, updateBrokerAccountById } from "../modules/Broker/services/broker.account.service"
import { findAllActives, findByCode } from "../modules/Broker/services/broker.service"
import { findAvailables as findAvailableStocks } from "../modules/Stock/services/stock.service"
import { createNewStockTracker, findActivesByAccount, populateStockTrackerDependencies, runOnCreate, updateStockTrackerById } from "../modules/Stock/services/stock.tracker.service"
import { activateSimulation, createProfile, findProfileById, updateAccount, updateUserPreferences } from '../modules/Identity/services/profile.service'
import { STFrequencyDef, StockTrackerFrequency } from "../modules/Stock/tracker/stock.tracker.frequency"
import { StrategyNames, StrategyNamesDef } from "../modules/Stock/strategies/strategy.names"

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
        return findProfileById(userAccountId)
    },

    fetchActiveStockTrackersQuery: async ({ userAccountId }: any) => {
        return findActivesByAccount(userAccountId)
    },

    fetchBrokerAccountQuery: ({ brokerAccountId }: any) => {
        return findBrokerAccount(brokerAccountId)
    },

    fetchBrokerAccountByUserQuery: ({ userAccountId }: any) => {
        return findBrokerAccountByUser(userAccountId)
    },

    fetchStockTrackerActivitiesQuery: ({ stockTrackerId, date, page, qty }: any) => {
        return findActivitiesByStockTracker(stockTrackerId, page, qty)
    },

    fetchUserActivitiesQuery: ({ userAccountId, date, page, qty }: any) => {
        return findActivitiesByAccount(userAccountId, page, qty)
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
        return createProfile(userAccount)
    },

    createBrokerAccount: ({ brokerAccount }: any) => {
        return createBrokerAccount(brokerAccount)
    },

    createStockTracker: async ({ stockTracker }: any) => {
        const model = await createNewStockTracker(stockTracker)
        if (runOnCreate(model)) {
            let investor = StockTrackerFactory.create(model)
            stockTrackerPlayground.addInvestor(investor)
        }
        return populateStockTrackerDependencies(model)
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

    updateStockTracker: async ({ _id, stockTracker }: any) => {
        let stockTrackerDB = await updateStockTrackerById(_id, stockTracker)
        stockTrackerPlayground.refreshInvestor(stockTrackerDB)
        return true
    },

    activateSimulationAccount: ({ userAccountId }: any) => {
        return activateSimulation(userAccountId)
    }
}