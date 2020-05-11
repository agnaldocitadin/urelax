import Identity from "../../Identity"
import { Investor, StockTrackerFactory } from "../trackers"
import { buildStockTrackersFrom, findStockTrackerBy } from "./stock.tracker.service"

/**
 *
 *
 * @returns {Promise<Investor[]>}
 */
export const wakeUpInvestors = async (): Promise<Investor[]> => {
    const accounts = await Identity.findAllowedAccounts()
    const StockTrackers = await Promise.all(accounts.map(async account => await buildStockTrackersFrom(account)))
    return StockTrackers.reduce((bag, currentTracker) => bag.concat(currentTracker), [])
}

/**
 *
 *
 * @param {string} id
 * @returns {Promise<Investor>}
 */
export const wakeUpInvestor = async (id: string): Promise<Investor> => {
    const stockTracker = await findStockTrackerBy(id)
    return StockTrackerFactory.create(stockTracker)
}