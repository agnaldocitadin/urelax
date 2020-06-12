import { ActivityType, StockTracker } from '.'
import { gql, query } from './graphql'
import { Activity, BrokerAccount, FinancialHistory } from './types'

export const fetchActivities = (options: { 
     id?: string, 
     account?: string, 
     ref?: string, 
     activityType?: ActivityType, 
     date?: string, 
     page?: number, 
     qty?: number }, 
     fields: string): Promise<Activity[]> => {
     const name = "fetchActivities"
     return gql(name, query(name, options, fields))
}

export const fetchBrokers = (options: { id: string, code: String, active: boolean }, fields: string) => {
     const name = "fetchBrokers"
     return gql(name, query(name, options, fields))
}

export const fetchBrokerAccounts = (options: { id: string, account: string }, fields: string): Promise<BrokerAccount[]> => {
     const name = "fetchBrokerAccounts"
     return gql(name, query(name, options, fields))
}

export const fetchStockTrackers = (options: { 
     id?: string, 
     account?: string, 
     status?: String, 
     frequency?: String, 
     page?: number, 
     qty?: number }, 
     fields: string): Promise<StockTracker[]> => {
     const name = "fetchStockTrackers"
     return gql(name, query(name, options, fields))
}

export const fetchFinancialHistory = (options: { 
     account?: string, 
     date?: string, 
     page?: number, 
     qty?: number }, 
     fields: string): Promise<FinancialHistory[]> => {
     const name = "fetchFinancialHistory"
     return gql(name, query(name, options, fields))
}