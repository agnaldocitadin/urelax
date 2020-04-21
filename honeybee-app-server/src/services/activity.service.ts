import { ts } from "../core/i18n"
import { Utils } from "../core/Utils"
import { Activity, ActivityModel, ActivityType } from "../models/activity.model"
import { OrderModel, OrderSides, OrderStatus } from "../models/order.model"
import { Stock } from "../models/stock.model"
import { StockTracker } from "../models/stock.tracker.model"
import { UserAccount } from "../models/user.account.model"
import { OrderExecution } from "../plugins/broker/broker.plugin"
import { StockTrackerFrequency } from "../stock-tracker/stock.tracker.frequency"
import { StrategyNames } from "../strategies/strategy.names"

enum Icons {
    ACCOUNT_CHECK = "account-check",
    ACCOUNT_STAR = "account-star",
    PLAY = "play-circle-outline",
    PAUSE = "pause-circle-outline",
    DELETE = "delete-outline",
    WALLET = "wallet-outline",
    CHART_LINE_VARIANT = "chart-line-variant",
    ARROW_TOP_RIGHT_THICK = "arrow-top-right-thick",
    ARROW_BOTTOM_LEFT_THICK = "arrow-bottom-left-thick",
    CANCEL = "cancel",
    CASH = "cash"
}

/**
 *
 *
 * @param {string} userAccountId
 * @param {number} page
 * @param {number} qty
 * @returns {Promise<Activity[]>}
 */
export const findActivitiesByUser = (userAccountId: string, page: number, qty: number): Promise<Activity[]> => {
    return ActivityModel.find({ userAccount: userAccountId })
        .sort({ dateTime: "desc" })
        .skip(page * qty)
        .limit(qty)
        .populate("userAccount")
        .exec()
}

/**
 *
 *
 * @param {string} id
 * @param {number} page
 * @param {number} qty
 * @returns {Promise<Activity[]>}
 */
export const findActivitiesByStockTracker = (id: string, page: number, qty: number): Promise<Activity[]> => {
    return ActivityModel.find({ ref: id, activityType: ActivityType.STOCK_TRACKER })
        .sort({ dateTime: "desc" })
        .skip(page * qty)
        .limit(qty)
        .populate("userAccount")
        .exec()
}

/**
 *
 *
 * @param {Activity} activity
 */
const createBaseActivity = (activity: Activity) => {
    activity.dateTime = new Date()
    ActivityModel.create(activity)
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 * @param {string} icon
 * @param {string} title
 */
const baseStockTrackerStatusTurnning = (stockTracker: StockTracker, icon: string, title: string) => {
    const stock = <Stock>stockTracker.stock
    const activity: any = {
        activityType: ActivityType.STOCK_TRACKER,
        icon,
        title,
        userAccount: stockTracker.userAccount,
        ref: stockTracker._id.toHexString(),
        details: [
            { title: ts("stock"), description: `${stock.description} (${stock.symbol})` }
        ]
    }
    createBaseActivity(activity)
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const onStockTrackerCreated = async (stockTracker: StockTracker) => {
    const stock = <Stock>stockTracker.stock
    const activity: any = {
        activityType: ActivityType.STOCK_TRACKER,
        title: ts("new_stock_tracker_add"),
        icon: Icons.CHART_LINE_VARIANT,
        userAccount: stockTracker.userAccount,
        ref: stockTracker._id.toHexString(),
        details: [
            { title: ts("stock"), description: `${stock.description} (${stock.symbol})` },
            { title: ts("strategy"), description: ts(StrategyNames.convert(stockTracker.strategy)._id), hidden: true },
            { title: ts("frequency"), description: ts(StockTrackerFrequency.convert(stockTracker.frequency).type), hidden: true },
            { title: ts("initial_status"), description: ts(stockTracker.status), hidden: true },
        ]
    }
    createBaseActivity(activity)
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const onStockTrackerTurnedToRunning = (stockTracker: StockTracker) => {
    baseStockTrackerStatusTurnning(stockTracker, Icons.PLAY, ts("stock_tracker_started"))
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const onStockTrackerTurnedToPaused = (stockTracker: StockTracker) => {
    baseStockTrackerStatusTurnning(stockTracker, Icons.PAUSE, ts("stock_tracker_paused"))
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const onStockTrackerTurnedToDestroyed = (stockTracker: StockTracker) => {
    baseStockTrackerStatusTurnning(stockTracker, Icons.DELETE, ts("stock_tracker_destroyed"))
}

/**
 *
 *
 * @param {OrderExecution} orderExecution
 * @param {StockTracker} stockTracker
 */
export const onStockOrderExecution = async (orderExecution: OrderExecution, stockTracker: StockTracker) => {
    
    let order = await OrderModel.findOne({ orderBrokerId: orderExecution.orderCode }).exec()
    let stock = <Stock>stockTracker.stock
    let userAccount = <UserAccount>stockTracker.userAccount

    let details = [
        { title: ts("stock"), description: `${stock.description} (${stock.symbol})` },
        { title: ts("amount"), description: Utils.Currency.format(order.getTotalOrder(), "R$") },
        { title: ts("quantity"), description: order.quantity, hidden: true },
        { title: ts("average_price"), description: Utils.Currency.format(order.getExecutedPriceAverage(), "R$"), hidden: true }
    ]

    const base: any = {
        activityType: ActivityType.STOCK_TRACKER,
        userAccount: userAccount._id,
        ref: stockTracker._id,
    }

    if (orderExecution.status === OrderStatus.FILLED) {
        if (order.side === OrderSides.BUY) {
            base.title = ts("buy_order_created")
            base.icon = Icons.ARROW_TOP_RIGHT_THICK
        }
        else {
            base.title = ts("sell_order_created")
            base.icon = Icons.ARROW_BOTTOM_LEFT_THICK
        }

        details.push({ title: ts("id"), description: order.orderBrokerId, hidden: true })
        base.details = details
        createBaseActivity(base)
    }

    if (orderExecution.status === OrderStatus.REJECTED) {
        if (order.side === OrderSides.BUY) {
            base.title = ts("buy_order_rejected")
            base.icon = Icons.CANCEL
        }
        else {
            base.title = ts("sell_order_rejected")
            base.icon = Icons.CANCEL
        }

        details.push({ title: ts("message"), description: order.message, hidden: true })
        details.push({ title: ts("id"), description: order.orderBrokerId, hidden: true })
        base.details = details
        createBaseActivity(base)
    }
}

/**
 *
 *
 * @param {UserAccount} account
 */
export const onCreateAccount = (account: UserAccount) => {
    const activity: any = {
        activityType: ActivityType.USER_ACCOUNT,
        title: ts("account_created"),
        icon: Icons.ACCOUNT_CHECK,
        userAccount: account._id,
        details: [
            { title: ts("name"), description: account.name },
            { title: ts("email"), description: account.email }
        ]
    }
    createBaseActivity(activity)
}

/**
 *
 *
 * @param {UserAccount} account
 */
export const onActivateSimulationAccount = (account: UserAccount) => {
    const activity: any = {
        activityType: ActivityType.USER_ACCOUNT,
        title: ts("account_credit"),
        icon: Icons.CASH,
        userAccount: account._id,
        details: [
            { 
                title: undefined, 
                description: ts("account_credit_msg", { amount: Utils.Currency.format(Number(process.env.INITIAL_SIMULATION_AMOUNT), "R$") })
            }
        ]
    }
    createBaseActivity(activity)
}