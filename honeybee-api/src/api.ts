import { timedPromise } from "./functions"
import { activateSimulationAccount, createBee, createBrokerAccount, createUserAccount, updateBee, updateBrokerAccount, updateUserAccount, updateUserPreferences } from './mutations'
import { fetchActiveBeesQuery, fetchActiveBrokers, fetchAvailableFrequencies, fetchAvailableStrategies, fetchAvailableSymbols, fetchBalanceSheet, fetchBalanceSheetByUserQuery, fetchBalanceSheetHistoriesByUserQuery, fetchBeeActivitiesQuery, fetchBrokerAccountByUserQuery, fetchBrokerAccountQuery, fetchBrokerByCode, fetchUserAccountQuery, fetchUserActivitiesQuery } from './queries'
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
    let res: Response = await timedPromise(fetch(url), "Server API was not found!")
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
    let res: Response = await timedPromise(fetch(`${CONFIG.serverURI}/playBee`, {
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
    let res: Response = await timedPromise(fetch(`${CONFIG.serverURI}/pauseBee`, {
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
    let res: Response = await timedPromise(fetch(`${CONFIG.serverURI}/destroyBee`, {
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
    fetchActiveBeesQuery,
    fetchBeeActivitiesQuery,
    fetchUserActivitiesQuery,
    fetchBrokerAccountQuery,
    fetchBrokerAccountByUserQuery,
    fetchBalanceSheet,
    fetchBalanceSheetByUserQuery,
    fetchBalanceSheetHistoriesByUserQuery,

    // mutation
    createUserAccount,
    createBee,
    createBrokerAccount,
    updateUserAccount,
    updateUserPreferences,
    updateBrokerAccount,
    updateBee,
    activateSimulationAccount
}

const handleResponse = async (res: Response) => {
    let json = await res.json()
    if (res.status !== 200) throw new Error(json.error)
    return json
}