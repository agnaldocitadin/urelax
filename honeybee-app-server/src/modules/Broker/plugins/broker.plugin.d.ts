import { Order, OrderPlatforms, OrderSides, OrderStatus } from "../../Order/models/order.model"
import { StockTracker } from "../../Stock/models/stock.tracker.model"

/**
 *
 *
 * @export
 * @interface BrokerPlugin
 */
export interface BrokerPlugin {

    /**
     *
     *
     * @memberof BrokerAdapter
     */
    init(): void

    /**
     *
     *
     * @memberof BrokerAdapter
     */
    destroy(): void
    
    /**
     *
     *
     * @param {Number} action
     * @param {Function} fn
     * @memberof BrokerAdapter
     */
    attach(action: Number, fn: Function): void
    
    /**
     *
     *
     * @param {Number} action
     * @memberof BrokerAdapter
     */
    detach(action: Number): void
    
    /**
     *
     *
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof BrokerAdapter
     */
    buy(order: Order): Promise<string>
    
    /**
     *
     *
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof BrokerAdapter
     */
    sell(order: Order): Promise<string>

    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @param {OrderPlatforms} plaftorm
     * @param {OrderSides} orderSide
     * @param {string} symbol
     * @returns {Promise<number>}
     * @memberof BrokerPlugin
     */
    totalAvailableAmount(stockTracker: StockTracker, plaftorm: OrderPlatforms, orderSide: OrderSides, symbol: string): Promise<number>

}

export type OrderExecution = {
    orderCode: string
    status: OrderStatus
    quantity: number
    price: number
    progress: number
    message?: string
}