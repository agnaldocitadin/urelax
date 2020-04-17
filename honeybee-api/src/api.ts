import { timedPromise } from "./functions"
import { UserAccount } from "./types"

const URL_REST_SERVER = "http://192.168.0.219:3002"

const handleResponse = async (res: any) => {
    let json = await res.json()
    if (res.status !== 200) {
        throw new Error(json.error)
    }
    return json
}

/**
 *
 *
 * @param {string} [email]
 * @param {string} [passwd]
 * @param {boolean} [simulation=false]
 * @returns {Promise<UserAccount>}
 */
const authenticate = (email?: string, passwd?: string, simulation: boolean = false): Promise<UserAccount> => {
    return timedPromise(fetch(`${URL_REST_SERVER}/authenticate?email=${email}&passwd=${passwd}&simulation=${simulation}`)
        .then(res => {
            if (res.ok) return res.json()
            throw new Error("Forbidden 403")
        }), "Server offline")
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const playStockTracker = (id: string) => {
    return timedPromise(fetch(`${URL_REST_SERVER}/playBee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(res => handleResponse(res)), "Server offline")
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const pauseStockTracker = (id: string) => {
    return timedPromise(fetch(`${URL_REST_SERVER}/pauseBee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    })
    .then(res => handleResponse(res)), "Server offline")
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const destroyStockTracker = (id: string) => {
    return timedPromise(fetch(`${URL_REST_SERVER}/destroyBee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }).then(res => handleResponse(res)), "Server offline")
}






export const API = {
    authenticate,
    playStockTracker,
    pauseStockTracker,
    destroyStockTracker
}