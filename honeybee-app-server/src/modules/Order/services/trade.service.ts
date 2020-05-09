import { Order, OrderModel } from "../models/order.model"
import { StockTracker } from "../../Stock/models/stock.tracker.model"
import { OrderExecution } from "../../Broker/plugins/broker.plugin"
import { PredictionResult } from "../../Stock/strategies/investiment.strategy"

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
export const makeAOrder = async (stockTracker: StockTracker, { 
    platform, 
    orderType, 
    orderSide, 
    quantity, 
    price, 
    expiresAt 
}: PredictionResult): Promise<Order> => {
    
    return await OrderModel.create({
        userAccount: stockTracker.userAccount,
        brokerAccount: stockTracker.brokerAccount,
        stockTracker: stockTracker._id,
        stock: stockTracker.stock,
        platform: platform,
        type: orderType,
        price: price,
        quantity: quantity,
        side: orderSide,
        createdAt: new Date(),
        expiresAt
    })
}

/**
 *
 *
 * @param {Order} order
 * @param {string} orderCode
 * @returns {Promise<Order>}
 */
export const updateOrderCode = (order: Order, orderCode: string): Promise<Order> => {
    order.orderBrokerId = orderCode
    order.updatedAt = new Date()
    return OrderModel.create(order)
}

/**
 *
 *
 * @param {OrderExecution} { orderCode, status, quantity, price, progress, message }
 * @returns {Promise<any>}
 */
export const addOrderExecution = ({ orderCode, status, quantity, price, progress, message }: OrderExecution): Promise<any> => {
    return Promise.all([
        OrderModel.updateOne(
            { orderBrokerId: orderCode },
            { status, message }
        ).exec(),
        
        OrderModel.updateOne(
            { orderBrokerId: orderCode, progress: { "$lt": progress }}, 
            { progress, "$push": { executions: { priceExecuted: price, quantityExecuted: quantity }}}
        ).exec()
    ])
}