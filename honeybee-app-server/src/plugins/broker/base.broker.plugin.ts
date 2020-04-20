import { Types } from 'mongoose'
import { Order, OrderPlatforms, OrderSides } from '../../models/order.model'
import { StockTracker } from '../../models/stock.tracker.model'
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

    attach(action: Number, fn: Function): void {
        this.callbacks.set(action, fn)
    }

    detach(action: Number): void {
        this.callbacks.delete(action)
    }

    destroy(): void {
        this.callbacks.clear()
    }

    abstract init(): void
    
    abstract async buy(order: Order): Promise<string>
    
    abstract async sell(order: Order): Promise<string>

    abstract async totalAvailableAmount(stockTracker: StockTracker, plaftorm: OrderPlatforms, orderSide: OrderSides, symbol: string): Promise<number>

}