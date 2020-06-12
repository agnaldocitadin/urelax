import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { APIError } from "."
import { activateSimulationAccount, createAccount, createBrokerAccount, createStockTracker, updateAccount, updateBrokerAccount, updateProfile, updateStockTracker } from "./mutations"
import { fetchActivities, fetchBrokerAccounts, fetchBrokers, fetchFinancialHistory, fetchStockTrackers } from "./queries"
import { authenticate, destroyStockTracker, pauseStockTracker, playStockTracker } from './rest'

interface APIConfiguration {
    baseURL: string,
    requestTimeout: number,
    requestInterceptor?(config: AxiosRequestConfig): AxiosRequestConfig,
    responseInterceptor?(response: AxiosResponse): AxiosResponse
}

interface InternAPIConfiguration extends APIConfiguration {
    axiosInstante: AxiosInstance
}

export const API_VERSION = "v1"
export const OFFLINE: APIError = { code: "API_OFFLINE" }
export const CONFIG = {} as InternAPIConfiguration

/**
 *
 *
 * @param {string} route
 * @param {boolean} [secure]
 * @returns
 */
export const baseRoute = (route: string, secure?: boolean) => {
    return `/${API_VERSION}${secure ? "/secure" : ""}${route}`
}

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
        updateProfile,
        createAccount,
        updateAccount,
        activateSimulationAccount
    },

    Activity: {
        fetchActivities
    },

    Security: {
        authenticate,
    },

    FinancialHistory: {
        fetchFinancialHistory
    },

    StockTracker: {
        playStockTracker,
        pauseStockTracker,
        destroyStockTracker,
        fetchStockTrackers,
        createStockTracker,
        updateStockTracker
    },

    Broker: {
        fetchBrokers,
        fetchBrokerAccounts,
        createBrokerAccount,
        updateBrokerAccount
    }
    
}