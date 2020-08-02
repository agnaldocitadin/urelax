import { ActivityType } from "honeybee-api"
import { ts } from "../../../core/i18n"
import { Utils } from "../../../core/Utils"
import { BrokerInvestiment } from "../../Broker/models"
import { OrderExecution } from "../../Broker/plugins/broker.plugin"
import { Profile } from "../../Identity/models/profile.model"
import { OrderModel, OrderSides, OrderStatus } from "../../Order/models"
import { StockTracker } from "../../Stock/models/stock.tracker.model"
import { StrategyNames } from "../../Stock/strategies"
import { StockTrackerFrequency } from "../../Stock/trackers"
import { Activity, ActivityDetail, ActivityModel } from "../models/activity.model"

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

export const findActivitiesBy = (options: { 
    id?: string
    accountID?: string
    ref?: string 
    activityType?: ActivityType
    date?: string
    page?: number
    qty?: number
    translate?: boolean
}): Promise<Activity[]> => {
        
    const { id, accountID, page = 0, qty = 1, translate } = options
    return ActivityModel.find({ account: accountID })
        .sort({ createdAt: "desc" })
        .skip(page * qty)
        .limit(qty)
        .map(docs => !translate ? docs : docs.map(doc => Activity.translate(doc)))
        .exec()
}

/**
 *
 *
 * @param {Activity} activity
 */
const createBaseActivity = (activity: Activity) => {
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
    const investiment = (<BrokerInvestiment>stockTracker.stockInfo)
    const activity: Activity = {
        activityType: ActivityType.STOCK_TRACKER,
        account: stockTracker.account,
        ref: stockTracker._id.toHexString(),
        icon,
        title: { 
            text: title 
        },
        details: [
            {
                title: { 
                    text: "stock"
                },
                description: {
                    text: `${investiment.description} (${investiment.stock.symbol})`
                },
                hidden: false
            }
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
    const investiment = (<BrokerInvestiment>stockTracker.stockInfo)
    const activity: Activity = {
        activityType: ActivityType.STOCK_TRACKER,
        account: stockTracker.account,
        ref: stockTracker._id.toHexString(),
        icon: Icons.CHART_LINE_VARIANT,
        title: { 
            text: "new_stock_tracker_add"
        },
        details: [
            {
                title: { 
                    text: "stock"
                },
                description: {
                    text: `${investiment.description} (${investiment.stock.symbol})`
                },
                hidden: false
            },
            {
                title: { 
                    text: "strategy"
                },
                description: {
                    text: StrategyNames.convert(stockTracker.strategy)._id
                },
                hidden: true
            },
            {
                title: { 
                    text: "frequency"
                },
                description: {
                    text: StockTrackerFrequency.convert(stockTracker.frequency).type
                },
                hidden: true
            },
            {
                title: { 
                    text: "initial_status"
                },
                description: {
                    text: stockTracker.status
                },
                hidden: true
            }
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
    baseStockTrackerStatusTurnning(stockTracker, Icons.PLAY, "stock_tracker_started")
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const onStockTrackerTurnedToPaused = (stockTracker: StockTracker) => {
    baseStockTrackerStatusTurnning(stockTracker, Icons.PAUSE, "stock_tracker_paused")
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const onStockTrackerTurnedToDestroyed = (stockTracker: StockTracker) => {
    baseStockTrackerStatusTurnning(stockTracker, Icons.DELETE, "stock_tracker_destroyed")
}

/**
 *
 *
 * @param {OrderExecution} orderExecution
 * @param {StockTracker} stockTracker
 * @param {number} profit
 */
export const onStockOrderExecution = async (orderExecution: OrderExecution, stockTracker: StockTracker, profit: number) => {
    
    let order = await OrderModel.findOne({ orderBrokerId: orderExecution.orderCode })
    let investiment = <BrokerInvestiment>stockTracker.stockInfo

    let details = [
        { title: { text: "stock" }, description: `${investiment.description} (${investiment.stock.symbol})` },
        { title: { text: "amount" }, description: Utils.Currency.format(order.getTotalOrder(), "R$") },
        { title: { text: "quantity" }, description: order.quantity, hidden: true },
        { title: { text: "average_price" }, description: Utils.Currency.format(order.getExecutedPriceAverage(), "R$"), hidden: true }
    ] as ActivityDetail[]

    const base = {
        activityType: ActivityType.STOCK_TRACKER,
        account: stockTracker.account,
        ref: stockTracker._id.toHexString()
    } as Activity

    if (orderExecution.status === OrderStatus.FILLED) {
        if (order.side === OrderSides.BUY) {
            base.title = { text: "buy_order_created" }
            base.icon = Icons.ARROW_TOP_RIGHT_THICK
        }
        else {
            base.title = { text: "sell_order_created" }
            base.icon = Icons.ARROW_BOTTOM_LEFT_THICK
            details.push({ 
                title: { text: profit >= 0 ? "gain" : "loss" }, 
                description: Utils.Currency.format(profit, "R$") 
            })
        }

        details.push({ title: ts("id"), description: order.orderBrokerId, hidden: true })
        base.details = details
        createBaseActivity(base)
    }

    if (orderExecution.status === OrderStatus.REJECTED) {
        if (order.side === OrderSides.BUY) {
            base.title = { text: "buy_order_rejected" }
            base.icon = Icons.CANCEL
        }
        else {
            base.title = { text: "sell_order_rejected" }
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
 * @param {Profile} profile
 */
export const onCreateAccount = (profile: Profile) => {
    const activity: Activity = {
        activityType: ActivityType.USER_ACCOUNT,
        title: { 
            text: "profile_created"
        },
        icon: Icons.ACCOUNT_CHECK,
        account: profile._id,
        details: [
            {
                title: { text: "name" },
                description: profile.name
            },
            {
                title: { text: "email" },
                description: profile.email
            }
        ]
    }
    createBaseActivity(activity)
}