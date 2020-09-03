import { BrokerPlugin } from "../../Broker/plugins"
import { OrderPlatforms, OrderSides, OrderTypes } from "../../Order/models"
import { StockTracker } from "../models"

/**
 *
 *
 * @export
 * @interface InvestimentStrategy
 */
export interface InvestimentStrategy<T> {

    /**
     *
     *
     * @param {Date} referenceDate
     * @param {StockTracker} stockTracker
     * @param {BrokerPlugin} brokerPlugin
     * @returns {Promise<void>}
     * @memberof InvestimentStrategy
     */
    prepare(referenceDate: Date, stockTracker: StockTracker, brokerPlugin: BrokerPlugin): Promise<void>
    
    /**
     *
     *
     * @param {Date} referenceDate
     * @param {StockTracker} stockTracker
     * @param {BrokerPlugin} brokerPlugin
     * @returns {Promise<PredictionResult>}
     * @memberof InvestimentStrategy
     */
    predict(referenceDate: Date, stockTracker: StockTracker, brokerPlugin: BrokerPlugin): Promise<PredictionResult>

    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @returns {Promise<StockTracker>}
     * @memberof InvestimentStrategy
     */
    proceedStockTrackerPlay(stockTracker: StockTracker): Promise<StockTracker>
    
    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @returns {Promise<StockTracker>}
     * @memberof InvestimentStrategy
     */
    proceedStockTrackerPause(stockTracker: StockTracker): Promise<StockTracker>
    
    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @returns {Promise<StockTracker>}
     * @memberof InvestimentStrategy
     */
    proceedStockTrackerDestroy(stockTracker: StockTracker): Promise<StockTracker>
    
    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @memberof InvestimentStrategy
     */
    onBuy(stockTracker: StockTracker): void

    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @memberof InvestimentStrategy
     */
    onSell(stockTracker: StockTracker): void

    /**
     * Provides a predition summary.
     *
     * @returns {T}
     * @memberof InvestimentStrategy
     */
    summary(): T
}

export type PredictionResult = { 
    platform: OrderPlatforms
    orderType: OrderTypes
    orderSide: OrderSides
    quantity?: number
    price?: number
    expiresAt?: Date
}

export type PredictionData = {
    date: Date
    open: number
    low: number
    high: number
    close: number
}