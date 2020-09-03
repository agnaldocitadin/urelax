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
/**
 *
 *
 * @param {string} [email]
 * @param {string} [password]
 * @returns {Promise<{profile: Profile, token: string}>}
 */
exports.authenticate = (email, password) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.invoke(() => (core_1.CONFIG.axiosInstante.post(core_1.baseRoute("/authenticate"), JSON.stringify({ email, password }))));
});
/**
 *
 *
 * @param {ProfileInput} profile
 * @returns {Promise<{profile: Profile, token: string}>}
 */
exports.signup = (profile) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.invoke(() => (core_1.CONFIG.axiosInstante.post(core_1.baseRoute("/signup"), JSON.stringify(profile))));
});
/**
 *
 *
 * @param {string} id
 * @returns
 */
exports.playStockTracker = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.invoke(() => (core_1.CONFIG.axiosInstante.post(core_1.baseRoute("/playStockTracker", true), JSON.stringify({ id }))));
});
/**
 *
 *
 * @param {string} id
 * @returns
 */
exports.pauseStockTracker = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.invoke(() => (core_1.CONFIG.axiosInstante.post(core_1.baseRoute("/pauseStockTracker", true), JSON.stringify({ id }))));
});
/**
 *
 *
 * @param {string} id
 * @returns
 */
exports.destroyStockTracker = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return exports.invoke(() => (core_1.CONFIG.axiosInstante.post(core_1.baseRoute("/destroyStockTracker", true), JSON.stringify({ id }))));
});
/**
 *
 *
 * @param {() => Promise<AxiosResponse>} call
 * @returns
 */
exports.invoke = (call) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let response = yield call();
        return response.data;
    }
    catch (e) {
        console.warn(e);
        let response = e.response;
        if (!response) {
            throw core_1.OFFLINE;
        }
        let data = response.data;
        if (data) {
            throw data;
        }
    }
});
