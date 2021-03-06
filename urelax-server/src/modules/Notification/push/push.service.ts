import admin from 'firebase-admin'
import { MessageTypes, NotificationMessage, StockTrackerStatus } from 'urelax-api'
import { utils } from 'js-commons'
import { ts } from '../../Translation/i18n'
import { OrderExecution } from "../../Broker/plugins/broker.plugin"
import { Account, Preferences } from '../../Identity/models'
import { findProfileBy } from '../../Identity/services'
import { Order, OrderModel, OrderSides, OrderStatus } from "../../Order/models/order.model"
import { StockTracker } from '../../Stock/models/stock.tracker.model'

const NOTIFICATION_ICON = "icon_notification"
const ICON_COLOR = "#1099f5"

/**
 * 
 *
 * @param {string} deviceToken
 * @param {Order} order
 */
const notifyBuy = (deviceToken: string, order: Order) => {
    const buyMessage = order.quantity > 0 ? "order_stock_plural" : "order_stock"
    admin.messaging().sendToDevice(deviceToken, {
        notification: {
            title: ts("buy_stock"),
            body: ts(buyMessage, { 
                count: order.quantity, 
                symbol: order.stock.symbol, 
                amount: utils.formatCurrency(order.getTotalOrder(), { prefix: "R$" })
            }),
            icon: NOTIFICATION_ICON,
            color: ICON_COLOR
        },
        data: {
            messageType: MessageTypes.STOCK_TRACKER_ORDER
        } as NotificationMessage
    })
}

/**
 *
 *
 * @param {string} deviceToken
 * @param {Order} order
 * @param {number} [profit=0]
 */
const notifySell = (deviceToken: string, order: Order, profit: number = 0) => {
    const sellMessage = order.quantity > 0 ? "order_stock_sell_plural" : "order_stock_sell"
    admin.messaging().sendToDevice(deviceToken, {
        notification: {
            title: ts("sell_stock"),
            body: ts(sellMessage, { 
                count: order.quantity, 
                symbol: order.stock.symbol,
                amount: utils.formatCurrency(order.getTotalOrder(), { prefix: "R$" }),
                profit: profit >= 0 ? ts("gain") : ts("loss"),
                profit_value: utils.formatCurrency(profit, { prefix: "R$"})
            }),
            icon: NOTIFICATION_ICON,
            color: ICON_COLOR
        },
        data: {
            messageType: MessageTypes.STOCK_TRACKER_ORDER
        } as NotificationMessage
    })
}

/**
 *
 *
 * @param {OrderExecution} execution
 * @param {string} deviceToken
 */
export const notifyOrder = async (execution: OrderExecution, profit: number, deviceToken: string, preferences: Preferences) => {
    if (execution.status === OrderStatus.FILLED && !!deviceToken) {
        const order = await OrderModel.findOne({ orderBrokerId: execution.orderCode })
        if (order.side === OrderSides.BUY && preferences.receiveBuyNotification) {
            notifyBuy(deviceToken, order)
        }
        if (order.side === OrderSides.SELL && preferences.receiveSellNotification) {
            notifySell(deviceToken, order, profit)
        }
    }
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const notifyStockTrackerPause = async (stockTracker: StockTracker) => {
    const profile = await findProfileBy({ account: String((<Account>stockTracker.account)._id) })
    const token = profile?.getActiveDevice().token
    admin.messaging().sendToDevice(token, {
        notification: {
            title: ts("stock_tracker_paused"),
            body: ts("stock_tracker_paused_msg", { symbol: stockTracker.getSymbol() }),
            icon: NOTIFICATION_ICON,
            color: ICON_COLOR
        },
        data: {
            messageType: MessageTypes.STOCK_TRACKER_STATUS,
            stockTrackerId: stockTracker._id.toHexString(),
            stockTrackerStatus: StockTrackerStatus.PAUSED
        } as NotificationMessage
    })
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const notifyStockTrackerDestroy = async (stockTracker: StockTracker) => {
    const profile = await findProfileBy({ account: String((<Account>stockTracker.account)._id) })
    const token = profile?.getActiveDevice().token
    admin.messaging().sendToDevice(token, {
        notification: {
            title: ts("stock_tracker_destroyed"),
            body: ts("stock_tracker_destroyed_msg", { symbol: stockTracker.getSymbol() }),
            icon: NOTIFICATION_ICON,
            color: ICON_COLOR
        },
        data: {
            messageType: MessageTypes.STOCK_TRACKER_STATUS,
            stockTrackerId: stockTracker._id.toHexString(),
            stockTrackerStatus: StockTrackerStatus.DESTROYED
        } as NotificationMessage
    })
}