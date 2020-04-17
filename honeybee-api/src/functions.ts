
const TIMEOUT = 10000

/**
 *
 *
 * @param {Promise<any>} promise
 * @param {string} error
 * @param {number} [timeout=TIMEOUT]
 * @returns {Promise<any>}
 */
export const timedPromise = async (promise: Promise<any>, error: string, timeout: number = TIMEOUT): Promise<any> => {
    return Promise.race([
        promise,
        new Promise<any>((_, reject) => setTimeout(() => reject(new Error(error)), timeout))
    ])
}