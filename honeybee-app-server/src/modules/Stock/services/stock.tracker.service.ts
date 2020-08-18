import { DocumentType, mongoose } from "@typegoose/typegoose"
import { ProfitType, StockTrackerInput, StockTrackerStatus, TransactionType } from "honeybee-api"
import { utils } from "js-commons"
import { onStockOrderExecution, onStockTrackerCreated, onStockTrackerTurnedToDestroyed, onStockTrackerTurnedToPaused, onStockTrackerTurnedToRunning } from "../../Activity/services"
import { BrokerInvestiment } from "../../Broker/models"
import { OrderExecution } from "../../Broker/plugins"
import { addProfit, addTransaction } from "../../Financial/services"
import { Account } from "../../Identity/models"
import { findActiveDeviceToken } from "../../Identity/services"
import { notifyOrder, notifyStockTrackerDestroy, notifyStockTrackerPause } from "../../Notification/services"
import { Order, OrderModel, OrderSides, OrderStatus } from "../../Order/models"
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
        .populate({ 
            path: "stockInfo", 
            populate: { 
                path: "broker"
            }
        })
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
    // TODO
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
export const makeStockOrder = (stockTracker: StockTracker, { 
    platform, 
    orderType, 
    orderSide, 
    quantity, 
    price, 
    expiresAt 
}: PredictionResult) => {
    
    const order: Order = {
        account: stockTracker.account,
        stock: {
            symbol: (<BrokerInvestiment>stockTracker.stockInfo).stock.symbol,
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
        .populate("account")
        .populate("brokerAccount")
        .populate("stockInfo")
    return trackers.map(model => StockTrackerFactory.create(model))
}

/**
 *
 *
 * @param {{
 *     id?: string
 *     account?: string
 *     status?: StockTrackerStatus
 *     frequency?: StockTrackerFrequency
 *     page?: number
 *     qty?: number
 * }} options
 * @returns
 */
export const findStockTrackers = async (options: {
    id?: string
    account?: string
    status?: StockTrackerStatus
    frequency?: StockTrackerFrequency
    page?: number
    qty?: number
}) => {
    const {
        id,
        account,
        status,
        frequency,
        page = 0,
        qty = Number(process.env.STANDARD_QUERY_RESULT)
    } = options

    return StockTrackerModel.find({ 
            ...utils.nonNull("_id", id),
            ...utils.nonNull("account", account),
            ...utils.nonNull("status", status),
            ...utils.nonNull("frequency", frequency)
        })
        .populate("account")
        .populate("stockInfo")
        .populate("brokerAccount")
        .skip(page * qty)
        .limit(qty)
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
    const stockTracker = await StockTrackerModel.findById(_id)
    const _input = utils.mergeObjects<StockTracker>(stockTracker.toObject(), input)
    await validate(_input)
    await StockTrackerModel.updateOne({ _id }, _input)
    return _input
}

/**
 *
 *
 * @param {OrderExecution} execution
 * @param {StockTracker} stockTracker
 */
export const processOrderExecution = async (execution: OrderExecution, stockTracker: StockTracker) => {
    // TODO isso precisa executar apenas uma vez!
    
    const order = await OrderModel.findOne({ orderBrokerId: execution.orderCode })
    let profit = 0
    
    if (order.side === OrderSides.BUY) {
        await processBuyOrder(execution, stockTracker)
        updateStockTrackerOnBuy(execution, stockTracker)
    }
    
    if (order.side === OrderSides.SELL) {
        profit = await processSellOrder(execution, stockTracker)
        updateStockTrackerOnSell(execution, stockTracker)
    }

    onStockOrderExecution(execution, stockTracker, profit)
    const token = await findActiveDeviceToken({ account: String((<Account>stockTracker.account)._id) })
    notifyOrder(execution, profit, token)
}

/**
 *
 *
 * @param {OrderExecution} execution
 * @param {StockTracker} stockTracker
 */
const updateStockTrackerOnBuy = (execution: OrderExecution, stockTracker: StockTracker) => {
    stockTracker.buyPrice = stockTracker.qty > 0 ? ((stockTracker.buyPrice + execution.price) / 2) : execution.price
    stockTracker.qty += execution.quantity;
    (<DocumentType<StockTracker>>stockTracker).save()
}

/**
 *
 *
 * @param {OrderExecution} execution
 * @param {StockTracker} stockTracker
 */
const updateStockTrackerOnSell = (execution: OrderExecution, stockTracker: StockTracker) => {
    stockTracker.qty -= execution.quantity
    if (stockTracker.qty === 0) {
        stockTracker.buyPrice = 0
        stockTracker.currentPrice = 0
    }
    (<DocumentType<StockTracker>>stockTracker).save()
}

/**
 *
 *
 * @param {OrderExecution} execution
 * @param {StockTracker} stockTracker
 */
const processBuyOrder = async (execution: OrderExecution, stockTracker: StockTracker) => {
    
    const now = new Date()
    const orderValue = execution.price * execution.quantity

    await addTransaction(stockTracker.getAccountId(), stockTracker.getBrokerAccountId(), now, {
        investiment: mongoose.Types.ObjectId("5ee7d11cb2443a3db2c320d3"), // TODO get the Money investiment
        type: TransactionType.TRANSFER,
        value: -orderValue,
        dateTime: now
    })
    
    await addTransaction(stockTracker.getAccountId(), stockTracker.getBrokerAccountId(), now, {
        investiment: stockTracker.getInvestimentId(),
        type: TransactionType.TRANSFER,
        value: orderValue,
        dateTime: now
    })
    
}

/**
 *
 *
 * @param {OrderExecution} execution
 * @param {StockTracker} stockTracker
 */
const processSellOrder = async (execution: OrderExecution, stockTracker: StockTracker) => {

    const now = new Date()
    const stockValue = stockTracker.getNegotiationPrice() * execution.quantity
    const moneyValue = execution.price * execution.quantity
    const profitValue = moneyValue - stockValue

    await addTransaction(stockTracker.getAccountId(), stockTracker.getBrokerAccountId(), now, {
        investiment: stockTracker.getInvestimentId(),
        type: TransactionType.TRANSFER,
        value: -stockValue,
        dateTime: now
    })

    await addTransaction(stockTracker.getAccountId(), stockTracker.getBrokerAccountId(), now, {
        investiment: mongoose.Types.ObjectId("5ee7d11cb2443a3db2c320d3"), // // TODO get the Money investiment
        type: TransactionType.TRANSFER,
        value: moneyValue,
        dateTime: now,
    })

    addProfit(
        stockTracker.getAccountId(), 
        stockTracker.getBrokerAccountId(), 
        stockTracker.getInvestimentId(),
        now,
        ProfitType.EXCHANGE, 
        profitValue
    )
    
    return profitValue
}