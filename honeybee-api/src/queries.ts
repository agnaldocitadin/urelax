import { ActivityType, StockTracker } from '.'
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

export const fetchStockTrackers = (options: { id: string, account: string, status: String, frequency: String, page: number, qty: number }, fields: string): Promise<StockTracker[]> => {
     const name = "fetchBrokerAccounts"
     return gql(name, query(name, options, fields))
}