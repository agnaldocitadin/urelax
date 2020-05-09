import { StockTrackerStatus } from 'honeybee-api'
import { ErrorCodes } from '../core/error.codes.d'
import { ts } from '../core/i18n'
import Logger from '../core/Logger'
import { StockTrackerFactory } from '../factories/stock.tracker.factory'
// import { StockModel } from '../models/stock.model'
import { StockTracker, StockTrackerModel } from '../models/stock.tracker.model'
// import { UserAccount, UserAccountModel } from '../models/user.account.model'
import { Investor } from '../stock-tracker/investor'
import { StockTrackerFrequency } from '../stock-tracker/stock.tracker.frequency'
import { StrategyNames } from '../strategies/strategy.names'
import { onStockTrackerCreated, onStockTrackerTurnedToDestroyed, onStockTrackerTurnedToPaused, onStockTrackerTurnedToRunning } from './activity.service'
import { findBalanceSheetOnCache } from './balance.sheet.service'
import { notifyStockTrackerDestroy, notifyStockTrackerPause } from './notification.service'
import { findProfileById } from './profile.service'

export const STOCK_TRACKER_STATUS_INACTIVE = [StockTrackerStatus.DESTROYED]
export const STOCK_TRACKER_STATUS_DONT_UPDATE = [StockTrackerStatus.PAUSED].concat(STOCK_TRACKER_STATUS_INACTIVE)


export const createNewStockTracker = async ({ account, brokerAccount, stock, strategy, frequency, stockAmountLimit, autoAmountLimit = false }: any): Promise<StockTracker> => {

    const {  } = await findProfileById(account)
    const status = preferences.addStockTrackerPaused ? StockTrackerStatus.PAUSED : StockTrackerStatus.RUNNING

    const model: any = {
        userAccount: account,
        brokerAccount,
        strategy,
        stock,
        status,
        frequency,
        stockAmountLimit,
        autoAmountLimit
    }

    await validate(model)
    const savedTracker = await StockTrackerModel.create(model)
    const populatedTracker = await savedTracker
        .populate("account")
        .populate("brokerAccount")
        .execPopulate()
        
    onStockTrackerCreated(populatedTracker)
    return populatedTracker
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Promise<void>}
 */
const validate = async (stockTracker: StockTracker): Promise<void> => {
    const stockModel = await StockModel.findById(stockTracker.stock).exec()
    if (!stockModel) {
        Logger.throw(ErrorCodes.STOCK_TRACKER_SYMBOL_NOT_FOUND, ts("stock_tracker_symbol_not_found", { symbol: stockTracker.stock }))
    }

    const userAccountModel = await UserAccountModel.findById(stockTracker.userAccount).exec()
    if (!userAccountModel) {
        Logger.throw(ErrorCodes.STOCK_TRACKER_ACCOUNT_NOT_FOUND, ts("stock_tracker_account_not_found", { id: stockTracker.userAccount }))
    }

    if (!Object.keys(StrategyNames).includes(stockTracker.strategy)) {
        Logger.throw(ErrorCodes.STOCK_TRACKER_STRATEGY_NOT_FOUND, ts("stock_tracker_strategy_not_found", { code: stockTracker.strategy }))
    }

    if (!Object.keys(StockTrackerStatus).includes(stockTracker.status)) {
        Logger.throw(ErrorCodes.STOCK_TRACKER_STATUS_NOT_FOUND, ts("stock_tracker_status_not_found", { status: stockTracker.status }))
    }

    StockTrackerFrequency.convert(stockTracker.frequency)
}

/**
 *
 *
 * @param {UserAccount} userAccount
 * @returns {Promise<Investor[]>}
 */
export const buildStockTrackersFrom = async (userAccount: UserAccount): Promise<Investor[]> => {
    return (await StockTrackerModel.find({ userAccount, status: { "$nin": STOCK_TRACKER_STATUS_INACTIVE }})
        .populate("userAccount")
        .populate("stock"))
        .map(model => StockTrackerFactory.create(model))
}

/**
 *
 *
 * @param {string} accountId
 * @returns {Promise<StockTracker[]>}
 */
export const findActivesByAccount = (accountId: string): Promise<StockTracker[]> => {
    const filter = { userAccount: accountId, status: { "$nin": STOCK_TRACKER_STATUS_INACTIVE }}
    return findStockTrackerToGraphql(filter)
}

/**
 *
 *
 * @param {*} filter
 * @returns {Promise<StockTracker[]>}
 */
const findStockTrackerToGraphql = async (filter: any): Promise<StockTracker[]> => {
    const stockTrackers: any[] = await StockTrackerModel.find(filter)
        .populate("userAccount")
        .populate("brokerAccount")
        .populate("stock")
        .sort({ "createdAt": "desc" })
    return stockTrackers.map(tracker => populateStockTrackerDependencies(tracker))
}

/**
 *
 *
 * @param {(StockTracker|any)} stockTracker
 * @returns {StockTracker}
 */
export const populateStockTrackerDependencies = (stockTracker: StockTracker|any): StockTracker => {
    let doc = Object.assign({}, stockTracker._doc)
    let strategy = StrategyNames.convert(stockTracker.strategy)
    let frequency = StockTrackerFrequency.convert(stockTracker.frequency)

    doc.strategy = {
        _id: strategy._id,
        description: ts(strategy._id),
        file: strategy.file,
        impl: strategy.impl
    }

    doc.frequency = {
        _id: frequency.type,
        description: ts(frequency.type)
    }

    return doc
}

/**
 *
 *
 * @param {String} id
 * @returns {Promise<StockTracker>}
 */
export const findStockTrackerBy = (id: String): Promise<StockTracker> => {
    return StockTrackerModel.findById(id)
        .populate("userAccount")
        .populate("stock")
        .exec()
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Boolean}
 */
export const runOnCreate = (stockTracker: StockTracker): Boolean => {
    return !STOCK_TRACKER_STATUS_INACTIVE.includes((<any>StockTrackerStatus)[stockTracker.status])
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Promise<StockTracker>}
 */
export const playStockTracker = async (stockTracker: StockTracker): Promise<StockTracker> => {
    stockTracker.status = StockTrackerStatus.RUNNING
    let updatedStockTracker = await StockTrackerModel.create(stockTracker)
    onStockTrackerTurnedToRunning(updatedStockTracker)
    return updatedStockTracker
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Promise<StockTracker>}
 */
export const waitStockTrackerPause = async (stockTracker: StockTracker): Promise<StockTracker> => {
    stockTracker.status = StockTrackerStatus.WAITING_PAUSE
    return await StockTrackerModel.create(stockTracker)
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @param {boolean} sendNotification
 * @returns {Promise<StockTracker>}
 */
export const pauseStockTracker = async (stockTracker: StockTracker, sendNotification: boolean): Promise<StockTracker> => {
    stockTracker.status = StockTrackerStatus.PAUSED
    let updatedStockTracker = await StockTrackerModel.create(stockTracker)
    onStockTrackerTurnedToPaused(updatedStockTracker)
    if (sendNotification) notifyStockTrackerPause(stockTracker)
    return updatedStockTracker
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Promise<StockTracker>}
 */
export const waitStockTrackerDestroy = async (stockTracker: StockTracker): Promise<StockTracker> => {
    stockTracker.status = StockTrackerStatus.WAITING_DESTROY
    return await StockTrackerModel.create(stockTracker)
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @param {boolean} sendNotification
 * @returns {Promise<StockTracker>}
 */
export const destroyStockTracker = async (stockTracker: StockTracker, sendNotification: boolean): Promise<StockTracker> => {
    stockTracker.status = StockTrackerStatus.DESTROYED
    let updatedStockTracker = await StockTrackerModel.create(stockTracker)
    onStockTrackerTurnedToDestroyed(updatedStockTracker)
    if (sendNotification) notifyStockTrackerDestroy(stockTracker)
    return updatedStockTracker
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Promise<boolean>}
 */
export const isBought = async (stockTracker: StockTracker): Promise<boolean> => {
    const balance = (await findBalanceSheetOnCache(stockTracker.getUserAccountId(), stockTracker.getBrokerAccountId()))[0]
    return balance.isBought(stockTracker.getSymbol())
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Promise<boolean>}
 */
export const isSold = async (stockTracker: StockTracker): Promise<boolean> => {
    const balance = (await findBalanceSheetOnCache(stockTracker.getUserAccountId(), stockTracker.getBrokerAccountId()))[0]
    return balance.isSold(stockTracker.getSymbol())
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns
 */
export const getBoughtQty = async (stockTracker: StockTracker) => {
    const balance = (await findBalanceSheetOnCache(stockTracker.getUserAccountId(), stockTracker.getBrokerAccountId()))[0]
    return balance.getQtyFrom(stockTracker.getSymbol())
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @param {Date} dateUpdate
 */
export const registerUpdate = (stockTracker: StockTracker, dateUpdate: Date) => {
    stockTracker.lastFrequencyUpdate = dateUpdate
    StockTrackerModel.create(stockTracker)
}

/**
 *
 *
 * @param {string} _id
 * @param {StockTracker} stockTracker
 * @returns {Promise<StockTracker>}
 */
export const updateStockTrackerById = async (_id: string, stockTracker: StockTracker): Promise<StockTracker> => {
    let stockTrackerDB: any = await StockTrackerModel.findById(_id)
    let updatedStockTracker: any = { ...stockTrackerDB._doc, ...stockTracker }
    await validate(updatedStockTracker)
    await StockTrackerModel.updateOne({ _id }, { ...stockTracker })
    return updatedStockTracker
}