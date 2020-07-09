import { ActivityType, StockTracker } from '.'
import { FinancialAnalysisPeriod } from './enums'
import { gql, query } from './graphql'
import { Activity, AppliedInvestiment, BrokerAccount, BrokerInvestiment, FinancialAnalysis, FinancialHistory, FinancialSummary, Frequency, Strategy } from './types'

export const fetchActivities = (options: { 
     id?: string, 
     accountID?: string, 
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

export const fetchBrokerAccounts = (options: { id?: string, account?: string }, fields: string): Promise<BrokerAccount[]> => {
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

export const fetchFinancialSummary = (options: { 
     account?: string
     date?: string
     page?: number
     qty?: number }, 
     fields: string): Promise<FinancialSummary[]> => {
     const name = "fetchFinancialSummary"
     return gql(name, query(name, options, fields))
}

export const fetchFinancialAnalysis = (options: {
     account: string
     brokerAccount?: string
     date?: string
     page?: number
     qty?: number
     period: FinancialAnalysisPeriod
     }, fields: string): Promise<FinancialAnalysis[]> => {
     const name = "fetchFinancialAnalysis"
     return gql(name, query(name, options, fields, {
          period: (value: FinancialAnalysisPeriod) => value
     }))
}

export const fetchAppiedInvestiments = (options: { account: string }, fields: string): Promise<AppliedInvestiment[]> => {
     const name = "fetchAppiedInvestiments"
     return gql(name, query(name, options, fields))
}

export const fetchAvailableInvestiments = (options: { brokerIDs?: string[], search: string }, fields: string): Promise<BrokerInvestiment[]> => {
     const name = "fetchAvailableInvestiments"
     return gql(name, query(name, options, fields))
}

export const fetchAvailableStrategies = (fields: string): Promise<Strategy[]> => {
     const name = "fetchAvailableStrategies"
     return gql(name, query(name, {}, fields))
}

export const fetchAvailableFrequencies = (fields: string): Promise<Frequency[]> => {
     const name = "fetchAvailableFrequencies"
     return gql(name, query(name, {}, fields))
}

