"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("./core");
const SEPARATOR = ",";
/**
 *
 *
 * @param {string} name
 * @param {object} [params]
 * @param {string} [fields]
 * @returns {string}
 */
exports.mutation = (name, params, fields, howToSerialize) => {
    const _params = exports.serialize(params, howToSerialize);
    return `mutation{${name}${_params ? `(${_params})` : ""}${fields ? `{${fields}}` : ""}}`;
};
/**
 *
 *
 * @param {string} name
 * @param {object} [params]
 * @param {string} [fields]
 * @returns {string}
 */
exports.query = (name, params, fields, howToSerialize) => {
    const _params = exports.serialize(params, howToSerialize);
    return `query{${name}${_params ? `(${_params})` : ""}${fields ? `{${fields}}` : ""}}`;
};
/**
 *
 *
 * @param {string} queryName
 * @param {string} query
 * @returns
 */
exports.gql = (queryName, query) => __awaiter(void 0, void 0, void 0, function* () {
    console.debug("Query:", query);
    try {
        let response = yield core_1.CONFIG.axiosInstante.post(core_1.baseRoute("/graphql", true), JSON.stringify({ query }));
        let json = response.data;
        let result = json.data[queryName];
        console.debug("Result:", result);
        return result;
    }
    catch (e) {
        if (!e.response) {
            throw core_1.OFFLINE;
        }
        let { data } = e.response;
        if (data && data.errors) {
            throw data.errors[0];
        }
        if (data) {
            throw data;
        }
    }
});
/**
 *
 *
 * @param {Object} [obj]
 * @param {object} [howToSerialize]
 * @returns {string}
 */
exports.serialize = (obj, howToSerialize) => {
    if (!obj)
        return "";
    let serialization = "";
    Object.keys(obj).forEach(field => {
        let value = obj[field];
        if (value == undefined || null)
            return;
        if (value instanceof Date || value instanceof Array || !(value instanceof Object)) {
            serialization = toPlain(serialization, field, serializeValue(value, field, howToSerialize));
        }
        else {
            serialization = toPlain(serialization, field, `{${exports.serialize(value, howToSerialize)}}`);
        }
    });
    return serialization;
};
/**
 *
 *
 * @param {string} bucket
 * @param {string} field
 * @param {string} flatValue
 * @returns
 */
const toPlain = (bucket, field, flatValue) => {
    return bucket.concat(`${bucket.length > 0 ? SEPARATOR : ""}${field}:${flatValue}`);
};
/**
 *
 *
 * @param {*} value
 * @returns
 */
const serializeValue = (value, field, howToSerialize) => {
    if (howToSerialize) {
        let serialize = howToSerialize[field];
        if (serialize) {
            return serialize(value);
        }
    }
    if (value instanceof Array) {
        return JSON.stringify(value);
    }
    if (value instanceof Date) {
        return `"${value.toISOString()}"`;
    }
    if (typeof value === "string") {
        return `"${value}"`;
    }
    return value;
};
