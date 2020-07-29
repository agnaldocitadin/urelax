import admin from 'firebase-admin'
import { MessageTypes, NotificationMessage, StockTrackerStatus } from 'honeybee-api'
import { ts } from '../../../core/i18n'
import { Utils } from '../../../core/Utils'
import { OrderExecution } from "../../Broker/plugins/broker.plugin"
import { Account } from '../../Identity/models'
import { Order, OrderModel, OrderSides, OrderStatus } from "../../Order/models/order.model"
import { StockTracker } from '../../Stock/models/stock.tracker.model'

const NOTIFICATION_ICON = "icon_notification"
const ICON_COLOR = "#1099f5"

/**
 * TODO Fix it!
 *
 * @param {string} deviceToken
 * @param {Order} order
 */
const notifyBuy = (deviceToken: string, order: Order) => {
    admin.messaging().sendToDevice(deviceToken, {
        notification: {
            title: ts("buy_stock"),
            body: ts("order_stock", { 
                count: order.quantity, 
                symbol: order.stock.symbol, 
                amount: Utils.Currency.format(order.getTotalOrder(), "R$")
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
    admin.messaging().sendToDevice(deviceToken, {
        notification: {
            title: ts("sell_stock"),
            body: ts("order_stock", { 
                count: order.quantity, 
                symbol: order.stock.symbol,
                amount: Utils.Currency.format(order.getTotalOrder(), "R$")
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
    const token = (<Account>stockTracker.account).getActiveDevice().token
    admin.messaging().sendToDevice(token, {
        notification: {
            title: ts("stock_tracker_paused"),
            body: ts("stock_tracker_paused_msg", { symbol: stockTracker.stockInfo.symbol }),
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
    const token = (<Account>stockTracker.account).getActiveDevice().token
    admin.messaging().sendToDevice(token, {
        notification: {
            title: ts("stock_tracker_destroyed"),
            body: ts("stock_tracker_destroyed_msg", { symbol: stockTracker.stockInfo.symbol }),
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