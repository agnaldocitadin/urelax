import { Types } from 'mongoose'
import { Order, OrderPlatforms, OrderSides } from '../../Order/models/order.model'
import { StockTracker } from '../../Stock/models/stock.tracker.model'
import { BrokerPlugin } from './broker.plugin'

export const AdapterCallbacks = Object.freeze({
    ORDER_EXECUTION: 0
})

/**
 *
 *
 * @export
 * @class BaseAdapter
 */
export abstract class BaseBrokerPlugin implements BrokerPlugin {

    brokerAccountId: Types.ObjectId
    callbacks: Map<Number, Function>

    constructor(brokerAccountId: Types.ObjectId) {
        this.callbacks = new Map()
        this.brokerAccountId = brokerAccountId
    }

    /**
     *
     *
     * @param {Number} action
     * @param {Function} fn
     * @memberof BaseBrokerPlugin
     */
    attach(action: Number, fn: Function): void {
        this.callbacks.set(action, fn)
    }

    /**
     *
     *
     * @param {Number} action
     * @memberof BaseBrokerPlugin
     */
    detach(action: Number): void {
        this.callbacks.delete(action)
    }

    /**
     *
     *
     * @memberof BaseBrokerPlugin
     */
    destroy(): void {
        this.callbacks.clear()
    }

    /**
     *
     *
     * @abstract
     * @memberof BaseBrokerPlugin
     */
    abstract init(): void
    
    /**
     *
     *
     * @abstract
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof BaseBrokerPlugin
     */
    abstract async buy(order: Order): Promise<string>
    
    /**
     *
     *
     * @abstract
     * @param {Order} order
     * @returns {Promise<string>}
     * @memberof BaseBrokerPlugin
     */
    abstract async sell(order: Order): Promise<string>

    /**
     *
     *
     * @abstract
     * @param {StockTracker} stockTracker
     * @param {OrderPlatforms} plaftorm
     * @param {OrderSides} orderSide
     * @param {string} symbol
     * @returns {Promise<number>}
     * @memberof BaseBrokerPlugin
     */
    abstract async totalAvailableAmount(stockTracker: StockTracker, plaftorm: OrderPlatforms, orderSide: OrderSides, symbol: string): Promise<number>

}