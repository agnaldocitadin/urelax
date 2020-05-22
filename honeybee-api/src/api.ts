import { APIError } from "."
import { activateSimulationAccount, createAccount, createBrokerAccount, createStockTracker, updateAccount, updateBrokerAccount, updateProfile, updateStockTracker } from "./mutations"
import { fetchActivities, fetchBrokerAccounts, fetchBrokers } from "./queries"
import { authenticate, destroyStockTracker, pauseStockTracker, playStockTracker } from './rest'

interface APIConfiguration {
    serverURI: string
}

export const API_VERSION = "v1"
export const OFFLINE: APIError = { code: "API_OFFLINE" }
export const CONFIG = {} as APIConfiguration

/**
 *
 *
 * @param {string} route
 * @param {boolean} [secure]
 * @returns
 */
export const baseRoute = (route: string, secure?: boolean) => {
    return `${CONFIG.serverURI}/${API_VERSION}${secure && "/secure"}${route}`
}

const configure = (conf: APIConfiguration) => {
    CONFIG["serverURI"] = conf.serverURI
}

export const API = {
    configure,

    // API
    authenticate,
    playStockTracker,
    pauseStockTracker,
    destroyStockTracker,

    // query
    fetchActivities,
    fetchBrokers,
    fetchBrokerAccounts,

    // mutation
    createBrokerAccount,
    updateBrokerAccount,
    updateProfile,
    createAccount,
    updateAccount,
    activateSimulationAccount,
    createStockTracker,
    updateStockTracker
}