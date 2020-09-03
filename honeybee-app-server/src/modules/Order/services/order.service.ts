import { OrderExecution } from "../../Broker/plugins/broker.plugin"
import { Order, OrderModel } from "../models/order.model"

/**
 *
 *
 * @param {Order} order
 * @returns
 */
export const makeBaseOrder = (order: Order) => {
    return OrderModel.create(order)
}

/**
 * 
 *
 * @param {Order} order
 * @param {string} orderCode
 * @returns {Promise<Order>}
 */
export const updateOrderCode = async (order: Order, orderCode: string): Promise<Order> => {
    await OrderModel.updateOne({ _id: order._id }, { 
        orderBrokerId: orderCode,
        updatedAt: new Date()
    })
    return order
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