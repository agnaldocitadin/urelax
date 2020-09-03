import { APIConfiguration } from './core';
export declare const API: {
    init: (conf: APIConfiguration) => void;
    Profile: {
        signup: (profile: import("./inputs").ProfileInput) => Promise<{
            profile: import("./types").Profile;
            token: string;
        }>;
        updateProfile: (id: string, input: import("./inputs").ProfileInput) => Promise<boolean>;
        updateAccount: (id: string, input: import("./types").Account) => Promise<boolean>;
        manageDevice: (id: string, input: import("./inputs").DeviceInput) => Promise<boolean>;
    };
    Activity: {
        fetchActivities: (options: {
            id?: string | undefined;
            accounts?: string[] | undefined;
            ref?: string | undefined;
            activityType?: import("./Enums").ActivityType | undefined;
            date?: string | undefined;
            page?: number | undefined;
            qty?: number | undefined;
        }, fields: string) => Promise<import("./types").Activity[]>;
    };
    Security: {
        authenticate: (email?: string | undefined, password?: string | undefined) => Promise<{
            profile: import("./types").Profile;
            token: string;
        }>;
    };
    FinancialHistory: {
        fetchFinancialSummary: (options: {
            brokerAccounts?: string[] | undefined;
            date?: string | undefined;
            page?: number | undefined;
            qty?: number | undefined;
        }, fields: string) => Promise<import("./types").FinancialSummary[]>;
        fetchAppiedInvestiments: (options: {
            brokerAccounts: string[];
        }, fields: string) => Promise<import("./types").AppliedInvestiment[]>;
        fetchFinancialAnalysis: (options: {
            brokerAccounts?: string[] | undefined;
            date?: string | undefined;
            page?: number | undefined;
            qty?: number | undefined;
            period: import("./Enums").FinancialAnalysisPeriod;
        }, fields: string) => Promise<import("./types").FinancialAnalysis[]>;
    };
    StockTracker: {
        playStockTracker: (id: string) => Promise<{
            status: import("./Enums").StockTrackerStatus;
        }>;
        pauseStockTracker: (id: string) => Promise<{
            status: import("./Enums").StockTrackerStatus;
        }>;
        destroyStockTracker: (id: string) => Promise<{
            status: import("./Enums").StockTrackerStatus;
        }>;
        fetchStockTrackers: (options: {
            id?: string | undefined;
            account?: string | undefined;
            status?: String | undefined;
            frequency?: String | undefined;
            page?: number | undefined;
            qty?: number | undefined;
        }, fields: string) => Promise<import("./types").StockTracker[]>;
        createStockTracker: (input: import("./inputs").StockTrackerInput, fields: string) => Promise<import("./types").StockTracker>;
        updateStockTracker: (id: string, input: import("./inputs").StockTrackerInput) => Promise<boolean>;
        fetchAvailableFrequencies: (fields: string) => Promise<import("./types").Frequency[]>;
        fetchAvailableStrategies: (fields: string) => Promise<import("./types").Strategy[]>;
    };
    Broker: {
        fetchBrokers: (options: {
            id?: string | undefined;
            code?: String | undefined;
            active?: boolean | undefined;
        }, fields: string) => Promise<import("./types").Broker[]>;
        fetchBrokerAccounts: (options: {
            id?: string | undefined;
            account?: string | undefined;
        }, fields: string) => Promise<import("./types").BrokerAccount[]>;
        createBrokerAccount: (input: import("./inputs").BrokerAccountInput, fields: string) => Promise<import("./types").BrokerAccount>;
        updateBrokerAccount: (id: string, input: import("./inputs").BrokerAccountInput) => Promise<boolean>;
        fetchAvailableInvestiments: (options: {
            brokerCodes?: import("./Enums").Brokers[] | undefined;
            search?: string | undefined;
            types?: import("./Enums").InvestimentType[] | undefined;
        }, fields: string) => Promise<import("./types").BrokerInvestiment[]>;
        fetchInvestimentSuggestion: (options: {
            account: string;
        }, fields: string) => Promise<import("./types").BrokerInvestiment>;
    };
};
