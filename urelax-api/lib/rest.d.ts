import { AxiosResponse } from "axios";
import { Profile, ProfileInput, StockTrackerStatus } from ".";
/**
 *
 *
 * @param {string} [email]
 * @param {string} [password]
 * @returns {Promise<{profile: Profile, token: string}>}
 */
export declare const authenticate: (email?: string | undefined, password?: string | undefined) => Promise<{
    profile: Profile;
    token: string;
}>;
/**
 *
 *
 * @param {ProfileInput} profile
 * @returns {Promise<{profile: Profile, token: string}>}
 */
export declare const signup: (profile: ProfileInput) => Promise<{
    profile: Profile;
    token: string;
}>;
/**
 *
 *
 * @param {string} id
 * @returns
 */
export declare const playStockTracker: (id: string) => Promise<{
    status: StockTrackerStatus;
}>;
/**
 *
 *
 * @param {string} id
 * @returns
 */
export declare const pauseStockTracker: (id: string) => Promise<{
    status: StockTrackerStatus;
}>;
/**
 *
 *
 * @param {string} id
 * @returns
 */
export declare const destroyStockTracker: (id: string) => Promise<{
    status: StockTrackerStatus;
}>;
/**
 *
 *
 * @param {() => Promise<AxiosResponse>} call
 * @returns
 */
export declare const invoke: (call: () => Promise<AxiosResponse<any>>) => Promise<any>;
