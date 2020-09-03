"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.API_VERSION = "v1";
exports.OFFLINE = { code: "API_OFFLINE" };
exports.CONFIG = {};
/**
 *
 *
 * @param {string} route
 * @param {boolean} [secure]
 * @returns
 */
exports.baseRoute = (route, secure) => {
    return `/${exports.API_VERSION}${secure ? "/secure" : ""}${route}`;
};
