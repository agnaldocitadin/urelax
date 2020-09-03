"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const graphql_1 = require("./graphql");
exports.createBrokerAccount = (input, fields) => {
    const name = "createBrokerAccount";
    return graphql_1.gql(name, graphql_1.mutation(name, { input }, fields));
};
exports.updateBrokerAccount = (id, input) => {
    const name = "updateBrokerAccount";
    return graphql_1.gql(name, graphql_1.mutation(name, { id, input }));
};
exports.updateProfile = (id, input) => {
    const name = "updateProfile";
    return graphql_1.gql(name, graphql_1.mutation(name, { id, input }));
};
exports.updateAccount = (id, input) => {
    const name = "updateAccount";
    return graphql_1.gql(name, graphql_1.mutation(name, { id, input }));
};
exports.createStockTracker = (input, fields) => {
    const name = "createStockTracker";
    return graphql_1.gql(name, graphql_1.mutation(name, { input }, fields));
};
exports.updateStockTracker = (id, input) => {
    const name = "updateStockTracker";
    return graphql_1.gql(name, graphql_1.mutation(name, { id, input }));
};
exports.manageDevice = (id, input) => {
    const name = "manageDevice";
    return graphql_1.gql(name, graphql_1.mutation(name, { id, input }));
};
