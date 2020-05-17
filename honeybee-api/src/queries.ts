import { ActivityType } from '.'
import { gql, query } from './graphql'

export const fetchActivities = (options: { 
     id?: string, 
     account?: string, 
     ref?: string, 
     activityType?: ActivityType, 
     date: String, 
     page: number, 
     qty: number }, 
     fields: string) => {
     const name = "fetchActivities"
     return gql(name, query(name, options, fields))
}

export const fetchBrokers = (options: { id: string, code: String, active: boolean }, fields: string) => {
     const name = "fetchBrokers"
     return gql(name, query(name, options, fields))
}

export const fetchBrokerAccounts = (options: { id: string, account: string }, fields: string) => {
     const name = "fetchBrokerAccounts"
     return gql(name, query(name, options, fields))
}

// export const fetchAvailableSymbols = (fields: string): Promise<Stock[]> => {
//      const name = "fetchAvailableSymbols"
//      return gql(name, query(name, {}, fields))
// }

// export const fetchActiveBrokers = (fields: string): Promise<Broker[]> => {
//      const name = "fetchActiveBrokers"
//      return gql(name, query(name, {}, fields))
// }

// export const fetchBrokerByCode = (brokerCode: string, fields: string): Promise<Broker> => {
//      const name = "fetchBrokerByCode"
//      return gql(name, query(name, { brokerCode }, fields))
// }

// export const fetchAvailableStrategies = (fields: string): Promise<Strategy[]> => {
//      const name = "fetchAvailableStrategies"
//      return gql(name, query(name, {}, fields))
// }

// export const fetchAvailableFrequencies = (fields: string): Promise<Frequency[]> => {
//      const name = "fetchAvailableFrequencies"
//      return gql(name, query(name, {}, fields))
// }

// export const fetchUserAccountQuery = (userAccountId: string, fields: string): Promise<UserAccount> => {
//      const name = "fetchUserAccountQuery"
//      return gql(name, query(name, { userAccountId }, fields))
// }

// export const fetchActiveStockTrackersQuery = (userAccountId: string, fields: string): Promise<StockTracker[]> => {
//      const name = "fetchActiveStockTrackersQuery"
//      return gql(name, query(name, { userAccountId }, fields))
// }

// export const fetchStockTrackerActivitiesQuery = (stockTrackerId: string, date: Date, page: number, qty: number, fields: string): Promise<Activity[]> => {
//      const name = "fetchStockTrackerActivitiesQuery"
//      return gql(name, query(name, { stockTrackerId, date, page, qty }, fields))
// }

// export const fetchUserActivitiesQuery = (userAccountId: string, date: Date, page: number, qty: number, fields: string): Promise<Activity[]> => {
//      const name = "fetchUserActivitiesQuery"
//      return gql(name, query(name, { userAccountId, date, page, qty }, fields))
// }

// export const fetchBrokerAccountQuery = (brokerAccountId: string, fields: string): Promise<BrokerAccount> => {
//      const name = "fetchBrokerAccountQuery"
//      return gql(name, query(name, { brokerAccountId }, fields))
// }

// export const fetchBrokerAccountByUserQuery = (userAccountId: string, fields: string): Promise<BrokerAccount[]> => {
//      const name = "fetchBrokerAccountByUserQuery"
//      return gql(name, query(name, { userAccountId }, fields))
// }

// export const fetchBalanceSheet = (userAccountId: string, fields: string, brokerAccountId?: string): Promise<BalanceSheet[]> => {
//      const name = "fetchBalanceSheet"
//      return gql(name, query(name, { userAccountId, brokerAccountId }, fields))
// }

// export const fetchBalanceSheetByUserQuery = (userAccountId: string, fields: string): Promise<BalanceSheetSummary> => {
//      const name = "fetchBalanceSheetByUserQuery"
//      return gql(name, query(name, { userAccountId }, fields))
// }

// export const fetchBalanceSheetHistoriesByUserQuery = (userAccountId: string, date: Date, page: number, qty: number, groupBy: GroupBy, fields: string): Promise<BalanceSheetHistorySummary[]> => {
//      const name = "fetchBalanceSheetHistoriesByUserQuery"
//      return gql(name, query(name, { userAccountId, date, page, qty, groupBy }, fields))
// }