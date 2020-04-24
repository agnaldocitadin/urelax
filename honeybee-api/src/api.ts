import { utils } from 'js-commons'
import { StockTrackerStatus } from './Enums'
import { activateSimulationAccount, createBrokerAccount, createStockTracker, createUserAccount, updateBrokerAccount, updateStockTracker, updateUserAccount, updateUserPreferences } from './mutations'
import { fetchActiveBrokers, fetchActiveStockTrackersQuery, fetchAvailableFrequencies, fetchAvailableStrategies, fetchAvailableSymbols, fetchBalanceSheet, fetchBalanceSheetByUserQuery, fetchBalanceSheetHistoriesByUserQuery, fetchBrokerAccountByUserQuery, fetchBrokerAccountQuery, fetchBrokerByCode, fetchStockTrackerActivitiesQuery, fetchUserAccountQuery, fetchUserActivitiesQuery } from './queries'
import { APIError, UserAccount } from "./types"

interface APIConfiguration {
    serverURI: string
    graphqlURI: string
}

export const CONFIG = {} as APIConfiguration

const configure = (conf: APIConfiguration) => {
    CONFIG["serverURI"] = conf.serverURI,
    CONFIG["graphqlURI"] = conf.graphqlURI
}

export const OFFLINE: APIError = { code: "API_OFFLINE" }

/**
 *
 *
 * @param {string} [email]
 * @param {string} [passwd]
 * @param {boolean} [simulation=false]
 * @returns {Promise<{user: UserAccount, token: string}>}
 */
const authenticate = async (email?: string, passwd?: string, simulation: boolean = false): Promise<{user: UserAccount, token: string}> => {
    let res: Response = await utils.timedPromise(fetch(`${CONFIG.serverURI}/authenticate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwd, simulation })
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const playStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    let res: Response = await utils.timedPromise(fetch(`${CONFIG.serverURI}/playStockTracker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const pauseStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    let res: Response = await utils.timedPromise(fetch(`${CONFIG.serverURI}/pauseStockTracker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const destroyStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    let res: Response = await utils.timedPromise(fetch(`${CONFIG.serverURI}/destroyStockTracker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), OFFLINE)
    return handleResponse(res)
}

export const API = {
    configure,

    // API
    authenticate,
    playStockTracker,
    pauseStockTracker,
    destroyStockTracker,

    // query
    fetchAvailableSymbols,
    fetchActiveBrokers,
    fetchBrokerByCode,
    fetchAvailableStrategies,
    fetchAvailableFrequencies,
    fetchUserAccountQuery,
    fetchActiveStockTrackersQuery,
    fetchStockTrackerActivitiesQuery,
    fetchUserActivitiesQuery,
    fetchBrokerAccountQuery,
    fetchBrokerAccountByUserQuery,
    fetchBalanceSheet,
    fetchBalanceSheetByUserQuery,
    fetchBalanceSheetHistoriesByUserQuery,

    // mutation
    createUserAccount,
    createStockTracker,
    createBrokerAccount,
    updateUserAccount,
    updateUserPreferences,
    updateBrokerAccount,
    updateStockTracker,
    activateSimulationAccount
}

const handleResponse = async (res: Response) => {
    let json = await res.json()
    if (!res.ok) throw json
    return json
}