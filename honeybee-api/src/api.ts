import { APIError } from "."
import { activateSimulationAccount, createAccount, createBrokerAccount, createProfile, createStockTracker, updateAccount, updateBrokerAccount, updateProfile, updateStockTracker } from "./mutations"
import { fetchActivities, fetchBrokerAccounts, fetchBrokers } from "./queries"
import { authenticate, destroyStockTracker, pauseStockTracker, playStockTracker } from './rest'

interface APIConfiguration {
    serverURI: string
    graphqlURI: string
}

export const OFFLINE: APIError = { code: "API_OFFLINE" }
export const CONFIG = {} as APIConfiguration

const configure = (conf: APIConfiguration) => {
    CONFIG["serverURI"] = conf.serverURI,
    CONFIG["graphqlURI"] = conf.graphqlURI
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
    createProfile,
    updateProfile,
    createAccount,
    updateAccount,
    activateSimulationAccount,
    createStockTracker,
    updateStockTracker
}