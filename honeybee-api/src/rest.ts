import { AxiosResponse } from "axios"
import { baseRoute, OFFLINE, Profile, StockTrackerStatus } from "."
import { CONFIG } from "./api"

/**
 *
 *
 * @param {string} [email]
 * @param {string} [password]
 * @returns {Promise<{profile: Profile, token: string}>}
 */
export const authenticate = async (email?: string, password?: string): Promise<{profile: Profile, token: string}> => {
    return invoke(() => (
        CONFIG.axiosInstante.post(baseRoute("/authenticate"), JSON.stringify({ email, password }))
    ))
}

/**
 *
 *
 * @param {Profile} profile
 * @returns {Promise<{profile: Profile, token: string}>}
 */
export const signup = async (profile: Profile): Promise<{profile: Profile, token: string}> => {
    return invoke(() => (
        CONFIG.axiosInstante.post(baseRoute("/signup"), JSON.stringify(profile))
    ))
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const playStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    return invoke(() => (
        CONFIG.axiosInstante.post(baseRoute("/playStockTracker", true), JSON.stringify({ id }))
    ))
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const pauseStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    return invoke(() => (
        CONFIG.axiosInstante.post(baseRoute("/pauseStockTracker", true), JSON.stringify({ id }))
    ))
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const destroyStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    return invoke(() => (
        CONFIG.axiosInstante.post(baseRoute("/pauseStockTracker", true), JSON.stringify({ id }))
    ))
}

/**
 *
 *
 * @param {() => Promise<AxiosResponse>} call
 * @returns
 */
export const invoke = async (call:() => Promise<AxiosResponse>) => {
    try {
        let response = await call()
        return response.data
    }
    catch(e) {
        let response = e.response
        if (!response) {
            throw OFFLINE
        }

        let data = response.data
        if (data) {
            throw data
        }
    }
}