import { utils } from 'js-commons'
import { activateSimulationAccount, createBrokerAccount, createStockTracker, createUserAccount, updateBrokerAccount, updateStockTracker, updateUserAccount, updateUserPreferences } from './mutations'
import { fetchActiveBrokers, fetchActiveStockTrackersQuery, fetchAvailableFrequencies, fetchAvailableStrategies, fetchAvailableSymbols, fetchBalanceSheet, fetchBalanceSheetByUserQuery, fetchBalanceSheetHistoriesByUserQuery, fetchBrokerAccountByUserQuery, fetchBrokerAccountQuery, fetchBrokerByCode, fetchStockTrackerActivitiesQuery, fetchUserAccountQuery, fetchUserActivitiesQuery } from './queries'
import { UserAccount } from "./types"

interface APIConfiguration {
    serverURI: string
    graphqlURI: string
}

export const CONFIG = {} as APIConfiguration

const configure = (conf: APIConfiguration) => {
    CONFIG["serverURI"] = conf.serverURI,
    CONFIG["graphqlURI"] = conf.graphqlURI
}

/**
 *
 *
 * @param {string} [email]
 * @param {string} [passwd]
 * @param {boolean} [simulation=false]
 * @returns {Promise<UserAccount>}
 */
const authenticate = async (email?: string, passwd?: string, simulation: boolean = false): Promise<UserAccount> => {
    let url = `${CONFIG.serverURI}/authenticate?email=${email}&passwd=${passwd}&simulation=${simulation}`
    let res: Response = await utils.timedPromise(fetch(url), "Server API was not found!")
    if (res.ok) return res.json()
    throw new Error("Forbidden 403")
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const playStockTracker = async (id: string) => {
    let res: Response = await utils.timedPromise(fetch(`${CONFIG.serverURI}/playStockTracker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), "Server offline")
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const pauseStockTracker = async (id: string) => {
    let res: Response = await utils.timedPromise(fetch(`${CONFIG.serverURI}/pauseStockTracker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), "Server offline")
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const destroyStockTracker = async (id: string) => {
    let res: Response = await utils.timedPromise(fetch(`${CONFIG.serverURI}/destroyStockTracker`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), "Server offline")
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
    if (res.status !== 200) throw new Error(json.error)
    return json
}