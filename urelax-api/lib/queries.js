"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("./graphql");
exports.fetchActivities = (options, fields) => {
    const name = "fetchActivities";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
exports.fetchBrokers = (options, fields) => {
    const name = "fetchBrokers";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
exports.fetchBrokerAccounts = (options, fields) => {
    const name = "fetchBrokerAccounts";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
exports.fetchStockTrackers = (options, fields) => {
    const name = "fetchStockTrackers";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
exports.fetchFinancialSummary = (options, fields) => {
    const name = "fetchFinancialSummary";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
exports.fetchFinancialAnalysis = (options, fields) => {
    const name = "fetchFinancialAnalysis";
    return graphql_1.gql(name, graphql_1.query(name, options, fields, {
        period: (value) => value
    }));
};
exports.fetchAppiedInvestiments = (options, fields) => {
    const name = "fetchAppiedInvestiments";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
exports.fetchAvailableInvestiments = (options, fields) => {
    const name = "fetchAvailableInvestiments";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
exports.fetchAvailableStrategies = (fields) => {
    const name = "fetchAvailableStrategies";
    return graphql_1.gql(name, graphql_1.query(name, {}, fields));
};
exports.fetchAvailableFrequencies = (fields) => {
    const name = "fetchAvailableFrequencies";
    return graphql_1.gql(name, graphql_1.query(name, {}, fields));
};
exports.fetchInvestimentSuggestion = (options, fields) => {
    const name = "fetchInvestimentSuggestion";
    return graphql_1.gql(name, graphql_1.query(name, options, fields));
};
