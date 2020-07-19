import { StockTrackerInput, StockTrackerStatus } from "honeybee-api"
import mongoose from 'mongoose'
import { flatObject } from "../../../core/Utils"
import { onStockTrackerCreated, onStockTrackerTurnedToDestroyed, onStockTrackerTurnedToPaused, onStockTrackerTurnedToRunning } from "../../Activity/services"
import { Account } from "../../Identity/models"
import { notifyStockTrackerDestroy, notifyStockTrackerPause } from "../../Notification/services"
import { Order, OrderStatus } from "../../Order/models"
import { makeBaseOrder } from "../../Order/services"
import { StockTracker, StockTrackerModel } from "../models"
import { PredictionResult } from "../strategies"
import { Investor, StockTrackerFactory, StockTrackerFrequency } from "../trackers"

export const STOCK_TRACKER_STATUS_INACTIVE = [StockTrackerStatus.DESTROYED]
export const STOCK_TRACKER_STATUS_DONT_UPDATE = [StockTrackerStatus.PAUSED].concat(STOCK_TRACKER_STATUS_INACTIVE)


/**
 *
 *
 * @param {StockTracker} model
 * @returns {Promise<StockTracker>}
 */
export const createNewStockTracker = async (model: StockTracker): Promise<StockTracker> => {
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
    // FIXME
    // const stockModel = {} //await StockModel.findById(stockTracker.stock).exec()

    // if (!stockModel) {
    //     Logger.throw(ErrorCodes.STOCK_TRACKER_SYMBOL_NOT_FOUND, ts("stock_tracker_symbol_not_found", { symbol: stockTracker.stock }))
    // }

    // const userAccountModel = await UserAccountModel.findById(stockTracker.userAccount).exec()
    // if (!userAccountModel) {
    //     Logger.throw(ErrorCodes.STOCK_TRACKER_ACCOUNT_NOT_FOUND, ts("stock_tracker_account_not_found", { id: stockTracker.userAccount }))
    // }

    // if (!Object.keys(StrategyNames).includes(stockTracker.strategy)) {
    //     Logger.throw(ErrorCodes.STOCK_TRACKER_STRATEGY_NOT_FOUND, ts("stock_tracker_strategy_not_found", { code: stockTracker.strategy }))
    // }

    // if (!Object.keys(StockTrackerStatus).includes(stockTracker.status)) {
    //     Logger.throw(ErrorCodes.STOCK_TRACKER_STATUS_NOT_FOUND, ts("stock_tracker_status_not_found", { status: stockTracker.status }))
    // }

    // StockTrackerFrequency.convert(stockTracker.frequency)
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @param {PredictionResult} { 
 *     platform, 
 *     orderType, 
 *     orderSide, 
 *     quantity, 
 *     price, 
 *     expiresAt 
 * }
 * @returns {Promise<Order>}
 */
export const makeStockOrder = async (stockTracker: StockTracker, { 
    platform, 
    orderType, 
    orderSide, 
    quantity, 
    price, 
    expiresAt 
}: PredictionResult): Promise<Order> => {
    
    const order: Order = {
        account: stockTracker.account,
        stock: {
            symbol: stockTracker.stockInfo.symbol,
            type: orderType,
            expiresAt
        },
        platform,
        price,
        quantity,
        side: orderSide,
        progress: 0,
        status: OrderStatus.NEW,
        createdAt: new Date()
    }

    return makeBaseOrder(order)
}

/**
 *
 *
 * @param {UserAccount} userAccount
 * @returns {Promise<Investor[]>}
 */
export const buildStockTrackersFrom = async (account: Account): Promise<Investor[]> => {
    let trackers = await StockTrackerModel.find({ account, status: { "$nin": STOCK_TRACKER_STATUS_INACTIVE }})
        .populate("brokerAccount")
        .populate("account")
    return trackers.map(model => StockTrackerFactory.create(model))
}

// /**
//  *
//  *
//  * @param {string} accountId
//  * @returns {Promise<StockTracker[]>}
//  */
// export const findActivesByAccount = (accountId: string): Promise<StockTracker[]> => {
//     const filter = { userAccount: accountId, status: { "$nin": STOCK_TRACKER_STATUS_INACTIVE }}
//     return findStockTrackerToGraphql(filter)
// }

// /**
//  *
//  *
//  * @param {*} filter
//  * @returns {Promise<StockTracker[]>}
//  */
// const findStockTrackerToGraphql = async (filter: any): Promise<StockTracker[]> => {
//     return StockTrackerModel.find(filter)
//         .populate("account")
//         .populate("brokerAccount")
//         .sort({ "createdAt": "desc" })
//         .exec()
// }

export const findStockTrackers = async (options: {
    id: mongoose.Types.ObjectId
    account: mongoose.Types.ObjectId
    status: StockTrackerStatus
    frequency: StockTrackerFrequency
    page: number
    qty: number
}) => {
    // TODO
    return StockTrackerModel.find({ _id: options.id })
        .populate("account")
        .populate("stockInfo")
        .populate("brokerAccount")
        .exec()
}

/**
 *
 *
 * @param {String} id
 * @returns {Promise<StockTracker>}
 */
export const findStockTrackerBy = (id: String): Promise<StockTracker> => {
    return StockTrackerModel.findById(id)
        .populate("account")
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
    // FIXME
    return false
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns {Promise<boolean>}
 */
export const isSold = async (stockTracker: StockTracker): Promise<boolean> => {
    // FIXME
    return false
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @returns
 */
export const getBoughtQty = async (stockTracker: StockTracker) => {
    // FIXME
    return 0
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @param {Date} dateUpdate
 */
export const registerUpdate = (stockTracker: StockTracker, dateUpdate: Date) => {
    stockTracker.lastFrequencyUpdate = dateUpdate
    StockTrackerModel.updateOne({ _id: stockTracker._id }, { lastFrequencyUpdate: dateUpdate }).exec()
}

/**
 *
 *
 * @param {string} _id
 * @param {StockTracker} input
 * @returns {Promise<StockTracker>}
 */
export const updateStockTrackerById = async (_id: string, input: StockTrackerInput): Promise<StockTracker> => {
    // const _input = StockTracker.from(input)
    // const stockTrackerDB = await StockTrackerModel.findById(_id)
    // let updatedStockTracker: any = { ...stockTrackerDB._doc, ...input }
    // await validate(input)
    const _input = flatObject(input)
    return StockTrackerModel.findByIdAndUpdate(_id, { "$set": _input }).exec()
    // return updatedStockTracker
}