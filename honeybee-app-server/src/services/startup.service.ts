import { StockTrackerFactory } from "../factories/stock.tracker.factory"
import { Investor } from "../stock-tracker/investor"
import { buildStockTrackersFrom, findStockTrackerBy } from "./stock.tracker.service"
import { findAllowedAccounts } from "./user.account.service"

/**
 *
 *
 * @returns {Promise<Investor[]>}
 */
export const wakeUpInvestors = async (): Promise<Investor[]> => {
    const accounts = await findAllowedAccounts()
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