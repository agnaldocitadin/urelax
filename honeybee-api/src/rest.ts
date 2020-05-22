import { utils } from "js-commons"
import { baseRoute, OFFLINE, Profile, StockTrackerStatus } from "."


/**
 *
 *
 * @param {string} [email]
 * @param {string} [passwd]
 * @param {boolean} [simulation=false]
 * @returns {Promise<{user: UserAccount, token: string}>}
 */
export const authenticate = async (email?: string, passwd?: string): Promise<{profile: Profile, token: string}> => {
    let res: Response = await utils.timedPromise(fetch(baseRoute("/authenticate"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, passwd })
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {Profile} profile
 * @returns {Promise<{profile: Profile, token: string}>}
 */
export const signup = async (profile: Profile): Promise<{profile: Profile, token: string}> => {
    let res: Response = await utils.timedPromise(fetch(baseRoute("/signup"), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(profile)
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const playStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    let res: Response = await utils.timedPromise(fetch(baseRoute("/playStockTracker", true), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const pauseStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    let res: Response = await utils.timedPromise(fetch(baseRoute("/pauseStockTracker", true), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
export const destroyStockTracker = async (id: string): Promise<{ status: StockTrackerStatus }> => {
    let res: Response = await utils.timedPromise(fetch(baseRoute("/destroyStockTracker", true), {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), OFFLINE)
    return handleResponse(res)
}

/**
 *
 *
 * @param {Response} res
 * @returns
 */
const handleResponse = async (res: Response) => {
    let json = await res.json()
    if (!res.ok) throw json
    return json
}