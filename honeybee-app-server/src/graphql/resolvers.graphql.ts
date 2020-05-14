import { ts } from "../core/i18n"
import { findActivitiesByAccount, findActivitiesByStockTracker } from "../modules/Activity/services"
import { createBrokerAccount, findAllActives, findBrokerAccount, findBrokerAccountByUser, findByCode, updateBrokerAccountById } from "../modules/Broker/services"
import { activateSimulation, createProfile, findProfileById, updateAccount } from "../modules/Identity/services"
import { createNewStockTracker, findActivesByAccount, runOnCreate, updateStockTrackerById } from "../modules/Stock/services"
import { StrategyNames, StrategyNamesDef } from "../modules/Stock/strategies"
import { STFrequencyDef, StockTrackerFactory, StockTrackerFrequency, stockTrackerPlayground } from "../modules/Stock/trackers"


export const resolvers = {

    // Queries

    fetchAvailableSymbols: () => {
        // return findAvailableStocks()
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

    

    fetchBrokerAccountQuery: ({ brokerAccountId }: any) => {
        return findBrokerAccount(brokerAccountId)
    },

    fetchBrokerAccountByUserQuery: ({ userAccountId }: any) => {
        return findBrokerAccountByUser(userAccountId)
    },

    

    fetchBalanceSheet: ({ userAccountId, brokerAccountId }: any) => {
        // return findBalanceSheet(userAccountId, brokerAccountId)
    },

    fetchBalanceSheetByUserQuery: ({ userAccountId }: any) => {
        // return findAllBalanceSheetByUser(userAccountId)
    },

    fetchBalanceSheetHistoriesByUserQuery: ({ userAccountId, date, page, qty, groupBy }: any) => {
        // return findAllBalanceSheetHistoryByUser(userAccountId, new Date(date), page, qty, groupBy)
    },

    // Mutations

    



    

    

    updateUserPreferences: ({ _id, preferences }: any) => {
        // return updateUserPreferences(_id, preferences)
    },

    

    

    
    
}