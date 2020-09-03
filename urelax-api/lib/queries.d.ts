import { ActivityType, StockTracker } from '.';
import { Brokers, FinancialAnalysisPeriod, InvestimentType } from './enums';
import { Activity, AppliedInvestiment, Broker, BrokerAccount, BrokerInvestiment, FinancialAnalysis, FinancialSummary, Frequency, Strategy } from './types';
export declare const fetchActivities: (options: {
    id?: string | undefined;
    accounts?: string[] | undefined;
    ref?: string | undefined;
    activityType?: ActivityType | undefined;
    date?: string | undefined;
    page?: number | undefined;
    qty?: number | undefined;
}, fields: string) => Promise<Activity[]>;
export declare const fetchBrokers: (options: {
    id?: string | undefined;
    code?: String | undefined;
    active?: boolean | undefined;
}, fields: string) => Promise<Broker[]>;
export declare const fetchBrokerAccounts: (options: {
    id?: string | undefined;
    account?: string | undefined;
}, fields: string) => Promise<BrokerAccount[]>;
export declare const fetchStockTrackers: (options: {
    id?: string | undefined;
    account?: string | undefined;
    status?: String | undefined;
    frequency?: String | undefined;
    page?: number | undefined;
    qty?: number | undefined;
}, fields: string) => Promise<StockTracker[]>;
export declare const fetchFinancialSummary: (options: {
    brokerAccounts?: string[] | undefined;
    date?: string | undefined;
    page?: number | undefined;
    qty?: number | undefined;
}, fields: string) => Promise<FinancialSummary[]>;
export declare const fetchFinancialAnalysis: (options: {
    brokerAccounts?: string[] | undefined;
    date?: string | undefined;
    page?: number | undefined;
    qty?: number | undefined;
    period: FinancialAnalysisPeriod;
}, fields: string) => Promise<FinancialAnalysis[]>;
export declare const fetchAppiedInvestiments: (options: {
    brokerAccounts: string[];
}, fields: string) => Promise<AppliedInvestiment[]>;
export declare const fetchAvailableInvestiments: (options: {
    brokerCodes?: Brokers[] | undefined;
    search?: string | undefined;
    types?: InvestimentType[] | undefined;
}, fields: string) => Promise<BrokerInvestiment[]>;
export declare const fetchAvailableStrategies: (fields: string) => Promise<Strategy[]>;
export declare const fetchAvailableFrequencies: (fields: string) => Promise<Frequency[]>;
export declare const fetchInvestimentSuggestion: (options: {
    account: string;
}, fields: string) => Promise<BrokerInvestiment>;
