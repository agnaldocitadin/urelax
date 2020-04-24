import admin from 'firebase-admin'
import { MessageTypes, NotificationMessage, StockTrackerStatus } from 'honeybee-api'
import { ts } from '../core/i18n'
import { Utils } from '../core/Utils'
import { Order, OrderModel, OrderSides, OrderStatus } from "../models/order.model"
import { Stock } from '../models/stock.model'
import { StockTracker } from '../models/stock.tracker.model'
import { UserAccount } from '../models/user.account.model'
import { OrderExecution } from "../plugins/broker/broker.plugin"

const NOTIFICATION_ICON = "icon_notification"
const ICON_COLOR = "#1099f5"

/**
 *
 *
 * @param {string} deviceToken
 * @param {Order} order
 */
const notifyBuy = (deviceToken: string, order: Order) => {
    const stock = <Stock>order.stock
    admin.messaging().sendToDevice(deviceToken, {
        notification: {
            title: ts("buy_stock"),
            body: ts("order_stock", { 
                count: order.quantity, 
                symbol: stock.toPresentation(), 
                amount: Utils.Currency.format(order.getTotalOrder(), "R$")
            }),
            icon: NOTIFICATION_ICON,
            color: ICON_COLOR
        }
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
    const stock = <Stock>order.stock
    admin.messaging().sendToDevice(deviceToken, {
        notification: {
            title: ts("sell_stock"),
            body: ts("order_stock", { 
                count: order.quantity, 
                symbol: stock.toPresentation(),
                amount: Utils.Currency.format(order.getTotalOrder(), "R$")
            }),
            icon: NOTIFICATION_ICON,
            color: ICON_COLOR
        }
    })
}

/**
 *
 *
 * @param {OrderExecution} execution
 * @param {string} deviceToken
 */
export const notifyOrder = async (execution: OrderExecution, deviceToken: string) => {
    if (execution.status === OrderStatus.FILLED) {
        let order = await OrderModel.findOne({ orderBrokerId: execution.orderCode }).populate("stock").exec()
        if (order.side === OrderSides.BUY) notifyBuy(deviceToken, order)
        if (order.side === OrderSides.SELL) notifySell(deviceToken, order)
    }
}

/**
 *
 *
 * @param {StockTracker} stockTracker
 */
export const notifyStockTrackerPause = (stockTracker: StockTracker) => {
    const token = (<UserAccount>stockTracker.userAccount).deviceToken
    const stock = <Stock>stockTracker.stock
    admin.messaging().sendToDevice(token, {
        notification: {
            title: ts("stock_tracker_paused"),
            body: ts("stock_tracker_paused_msg", { symbol: stock.toPresentation() }),
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
export const notifyStockTrackerDestroy = (stockTracker: StockTracker) => {
    const token = (<UserAccount>stockTracker.userAccount).deviceToken
    const stock = <Stock>stockTracker.stock
    admin.messaging().sendToDevice(token, {
        notification: {
            title: ts("stock_tracker_destroyed"),
            body: ts("stock_tracker_destroyed_msg", { symbol: stock.toPresentation() }),
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