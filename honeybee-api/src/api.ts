import axios from 'axios'
import { APIConfiguration, CONFIG } from './core'
import { createBrokerAccount, createStockTracker, manageDevice, updateAccount, updateBrokerAccount, updateProfile, updateStockTracker } from "./mutations"
import { fetchActivities, fetchAppiedInvestiments, fetchAvailableFrequencies, fetchAvailableInvestiments, fetchAvailableStrategies, fetchBrokerAccounts, fetchBrokers, fetchFinancialAnalysis, fetchFinancialHistory, fetchFinancialSummary, fetchInvestimentSuggestion, fetchStockTrackers } from "./queries"
import { authenticate, destroyStockTracker, pauseStockTracker, playStockTracker, signup } from './rest'

const configure = (conf: APIConfiguration) => {
    CONFIG["baseURL"] = conf.baseURL
    CONFIG["requestTimeout"] = conf.requestTimeout
    CONFIG["requestInterceptor"] = conf.requestInterceptor
    CONFIG["responseInterceptor"] = conf.responseInterceptor
}

const init = (conf: APIConfiguration) => {
    configure(conf)
    CONFIG["axiosInstante"] = axios.create({
        baseURL: CONFIG.baseURL,
        timeout: CONFIG.requestTimeout,
        responseType: "json",
        headers: {
            "Content-Type": "application/json;charset=UTF-8", 
            "Accept-Encoding": "gzip, deflate"
        }
    })

    CONFIG.requestInterceptor && CONFIG.axiosInstante.interceptors.request.use(CONFIG.requestInterceptor)
    CONFIG.responseInterceptor && CONFIG.axiosInstante.interceptors.response.use(CONFIG.responseInterceptor)
}

export const API = {
    init,

    Profile: {
        signup,
        updateProfile,
        updateAccount,
        manageDevice
    },

    Activity: {
        fetchActivities
    },

    Security: {
        authenticate
    },

    FinancialHistory: {
        fetchFinancialHistory,
        fetchFinancialSummary,
        fetchAppiedInvestiments,
        fetchFinancialAnalysis
    },

    StockTracker: {
        playStockTracker,
        pauseStockTracker,
        destroyStockTracker,
        fetchStockTrackers,
        createStockTracker,
        updateStockTracker,
        fetchAvailableFrequencies,
        fetchAvailableStrategies
    },

    Broker: {
        fetchBrokers,
        fetchBrokerAccounts,
        createBrokerAccount,
        updateBrokerAccount,
        fetchAvailableInvestiments,
        fetchInvestimentSuggestion
    }
    
}