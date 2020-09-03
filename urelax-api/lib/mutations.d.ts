import { BrokerAccountInput, DeviceInput, ProfileInput, StockTrackerInput } from "./inputs";
import { Account, BrokerAccount, StockTracker } from "./types";
export declare const createBrokerAccount: (input: BrokerAccountInput, fields: string) => Promise<BrokerAccount>;
export declare const updateBrokerAccount: (id: string, input: BrokerAccountInput) => Promise<boolean>;
export declare const updateProfile: (id: string, input: ProfileInput) => Promise<boolean>;
export declare const updateAccount: (id: string, input: Account) => Promise<boolean>;
export declare const createStockTracker: (input: StockTrackerInput, fields: string) => Promise<StockTracker>;
export declare const updateStockTracker: (id: string, input: StockTrackerInput) => Promise<boolean>;
export declare const manageDevice: (id: string, input: DeviceInput) => Promise<boolean>;
