import axios from 'axios'
import { APIConfiguration, CONFIG } from './core'
import { createBrokerAccount, createProfile, createStockTracker, updateAccount, updateBrokerAccount, updateProfile, updateStockTracker } from "./mutations"
import { fetchActivities, fetchAppiedInvestiments, fetchAvailableFrequencies, fetchAvailableInvestiments, fetchAvailableStrategies, fetchBrokerAccounts, fetchBrokers, fetchFinancialAnalysis, fetchFinancialHistory, fetchFinancialSummary, fetchStockTrackers } from "./queries"
import { authenticate, destroyStockTracker, pauseStockTracker, playStockTracker } from './rest'

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
        createProfile,
        updateProfile,
        updateAccount
    },

    Activity: {
        fetchActivities
    },

    Security: {
        authenticate,
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
        fetchAvailableInvestiments
    }
    
}