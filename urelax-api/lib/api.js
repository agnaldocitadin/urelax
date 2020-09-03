"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = require("axios");
const core_1 = require("./core");
const mutations_1 = require("./mutations");
const queries_1 = require("./queries");
const rest_1 = require("./rest");
const configure = (conf) => {
    core_1.CONFIG["baseURL"] = conf.baseURL;
    core_1.CONFIG["requestTimeout"] = conf.requestTimeout;
    core_1.CONFIG["requestInterceptor"] = conf.requestInterceptor;
    core_1.CONFIG["responseInterceptor"] = conf.responseInterceptor;
};
const init = (conf) => {
    configure(conf);
    core_1.CONFIG["axiosInstante"] = axios_1.default.create({
        baseURL: core_1.CONFIG.baseURL,
        timeout: core_1.CONFIG.requestTimeout,
        responseType: "json",
        headers: {
            "Content-Type": "application/json;charset=UTF-8",
            "Accept-Encoding": "gzip, deflate"
        }
    });
    core_1.CONFIG.requestInterceptor && core_1.CONFIG.axiosInstante.interceptors.request.use(core_1.CONFIG.requestInterceptor);
    core_1.CONFIG.responseInterceptor && core_1.CONFIG.axiosInstante.interceptors.response.use(core_1.CONFIG.responseInterceptor);
};
exports.API = {
    init,
    Profile: {
        signup: rest_1.signup,
        updateProfile: mutations_1.updateProfile,
        updateAccount: mutations_1.updateAccount,
        manageDevice: mutations_1.manageDevice
    },
    Activity: {
        fetchActivities: queries_1.fetchActivities
    },
    Security: {
        authenticate: rest_1.authenticate
    },
    FinancialHistory: {
        fetchFinancialSummary: queries_1.fetchFinancialSummary,
        fetchAppiedInvestiments: queries_1.fetchAppiedInvestiments,
        fetchFinancialAnalysis: queries_1.fetchFinancialAnalysis
    },
    StockTracker: {
        playStockTracker: rest_1.playStockTracker,
        pauseStockTracker: rest_1.pauseStockTracker,
        destroyStockTracker: rest_1.destroyStockTracker,
        fetchStockTrackers: queries_1.fetchStockTrackers,
        createStockTracker: mutations_1.createStockTracker,
        updateStockTracker: mutations_1.updateStockTracker,
        fetchAvailableFrequencies: queries_1.fetchAvailableFrequencies,
        fetchAvailableStrategies: queries_1.fetchAvailableStrategies
    },
    Broker: {
        fetchBrokers: queries_1.fetchBrokers,
        fetchBrokerAccounts: queries_1.fetchBrokerAccounts,
        createBrokerAccount: mutations_1.createBrokerAccount,
        updateBrokerAccount: mutations_1.updateBrokerAccount,
        fetchAvailableInvestiments: queries_1.fetchAvailableInvestiments,
        fetchInvestimentSuggestion: queries_1.fetchInvestimentSuggestion
    }
};
