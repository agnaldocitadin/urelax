import { timedPromise } from "./functions"
import { gql, mutation, query } from "./graphql"
import { Activity, UserAccount } from "./types"

interface APIConfiguration {
    serverURI: string
    graphqlURI: string
}

export const CONFIG = {} as APIConfiguration

const configure = (conf: APIConfiguration) => {
    CONFIG["serverURI"] = conf.serverURI,
    CONFIG["graphqlURI"] = conf.graphqlURI
}


/**
 *
 *
 * @param {string} [email]
 * @param {string} [passwd]
 * @param {boolean} [simulation=false]
 * @returns {Promise<UserAccount>}
 */
const authenticate = async (email?: string, passwd?: string, simulation: boolean = false): Promise<UserAccount> => {
    let url = `${CONFIG.serverURI}/authenticate?email=${email}&passwd=${passwd}&simulation=${simulation}`
    let res: Response = await timedPromise(fetch(url), "Server API was not found!")
    if (res.ok) return res.json()
    throw new Error("Forbidden 403")
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const playStockTracker = async (id: string) => {
    let res: Response = await timedPromise(fetch(`${CONFIG.serverURI}/playBee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), "Server offline")
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const pauseStockTracker = async (id: string) => {
    let res: Response = await timedPromise(fetch(`${CONFIG.serverURI}/pauseBee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), "Server offline")
    return handleResponse(res)
}

/**
 *
 *
 * @param {string} id
 * @returns
 */
const destroyStockTracker = async (id: string) => {
    let res: Response = await timedPromise(fetch(`${CONFIG.serverURI}/destroyBee`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id })
    }), "Server offline")
    return handleResponse(res)
}

/**
 *
 *
 * @param {UserAccount} [userAccount]
 * @returns {Promise<boolean>}
 */
const updateUserAccount = async (userAccount?: UserAccount): Promise<boolean> => {
    const name = "updateUserAccount"
    return gql(name, mutation(name, { userAccount }))
}

// ---------------
const fetchLastUserActivity = async (userAccountId?: string): Promise<Activity> => {
    const name = "fetchUserActivitiesQuery"
    return (await gql(name, query(name, { userAccountId, page: 0, qty: 1 }, `
        icon
        dateTime
        title
        details{
            title
            description
            hidden
        }
    `)))[0]
}
// ---------------

export const API = {
    configure,

    // API
    authenticate,
    playStockTracker,
    pauseStockTracker,
    destroyStockTracker,
    updateUserAccount,
    fetchLastUserActivity
}

const handleResponse = async (res: Response) => {
    let json = await res.json()
    if (res.status !== 200) throw new Error(json.error)
    return json
}