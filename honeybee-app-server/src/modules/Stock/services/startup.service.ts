import { StockTrackerFactory } from "../tracker/stock.tracker.factory"
import { Investor } from "../tracker/investor"
import { buildStockTrackersFrom, findStockTrackerBy } from "./stock.tracker.service"
import { findAllowedProfiles } from "../../Identity/services/profile.service"

/**
 *
 *
 * @returns {Promise<Investor[]>}
 */
export const wakeUpInvestors = async (): Promise<Investor[]> => {
    const accounts = await findAllowedProfiles()
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