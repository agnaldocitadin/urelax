import { StockTrackerStatus } from 'honeybee-api'
import Logger from '../core/Logger'
import { OrderSides } from '../models/order.model'
import { Account } from '../models/profile.model'
import { StockTracker } from '../models/stock.tracker.model'
import { AdapterCallbacks } from '../plugins/broker/base.broker.plugin'
import { BrokerPlugin, OrderExecution } from '../plugins/broker/broker.plugin'
import { onStockOrderExecution } from "../services/activity.service"
import { processBalanceByExecution } from '../services/balance.sheet.service'
import { notifyOrder } from "../services/notification.service"
import { registerUpdate, STOCK_TRACKER_STATUS_DONT_UPDATE } from '../services/stock.tracker.service'
import { addOrderExecution, makeAOrder, updateOrderCode } from '../services/trade.service'
import { InvestimentStrategy, PredictionResult } from '../strategies/investiment.strategy'
import { StockTrackerFrequency } from './stock.tracker.frequency'

/**
 *
 *
 * @export
 * @class Investor
 */
export class Investor {

    stockTrackerModel: StockTracker
    strategy: InvestimentStrategy<any>
    brokerPlugin: BrokerPlugin

    constructor(stockTracker: StockTracker, strategy: InvestimentStrategy<any>, brokerPlugin: BrokerPlugin) {
        this.strategy = strategy
        this.brokerPlugin = brokerPlugin
        this.stockTrackerModel = stockTracker
    }

    /**
     *
     *
     * @private
     * @param {Date} date
     * @returns {boolean}
     * @memberof Investor
     */
    private checkStockTrackerFrequency(date: Date): boolean {
        let { lastFrequencyUpdate, frequency } = this.stockTrackerModel
        let stockTrackerFrequency = StockTrackerFrequency.convert(frequency)
        return stockTrackerFrequency.hasToUpdate(date, lastFrequencyUpdate)
    }

    /**
     *
     *
     * @returns {Promise<void>}
     * @memberof Investor
     */
    async init(): Promise<void> {
        this.brokerPlugin.init()
        this.brokerPlugin.attach(AdapterCallbacks.ORDER_EXECUTION, (execution: OrderExecution) => this.orderExecutionCallback(execution))
        this.strategy.prepare(new Date(), this.stockTrackerModel, this.brokerPlugin)
    }

    /**
     *
     *
     * @param {Date} date
     * @returns {boolean}
     * @memberof Investor
     */
    canUpdate(date: Date): boolean {
        const status = (<any>StockTrackerStatus)[this.stockTrackerModel.status]
        const { lastFrequencyUpdate } = this.stockTrackerModel
        return !STOCK_TRACKER_STATUS_DONT_UPDATE.includes(status) && (!lastFrequencyUpdate || this.checkStockTrackerFrequency(date))
    }

    /**
     *
     *
     * @returns {Promise<StockTracker>}
     * @memberof Investor
     */
    play(): Promise<StockTracker> {
        return this.strategy.proceedStockTrackerPlay(this.stockTrackerModel)
    }

    /**
     *
     *
     * @returns {Promise<StockTracker>}
     * @memberof Investor
     */
    pause(): Promise<StockTracker> {
        return this.strategy.proceedStockTrackerPause(this.stockTrackerModel)
    }

    /**
     *
     *
     * @returns {Promise<StockTracker>}
     * @memberof Investor
     */
    destroy(): Promise<StockTracker> {
        return this.strategy.proceedStockTrackerDestroy(this.stockTrackerModel)
    }

    /**
     *
     *
     * @memberof Investor
     */
    shuttdow(): void {
        this.brokerPlugin.destroy()
    }

    /**
     *
     *
     * @param {Date} now
     * @returns {Promise<void>}
     * @memberof Investor
     */
    async update(now: Date): Promise<void> {
        const prediction = await this.strategy.predict(now, this.stockTrackerModel, this.brokerPlugin)
        switch(prediction.orderSide) {
            case OrderSides.BUY: 
                await this.buy(prediction)
                break

            case OrderSides.SELL: 
                await this.sell(prediction)
                break
        }

        registerUpdate(this.stockTrackerModel, now)
        Logger.debug("Investor@%s updated succesfully!", this.stockTrackerModel._id)
    }

    /**
     *
     *
     * @param {PredictionResult} prediction
     * @returns {Promise<void>}
     * @memberof Investor
     */
    async buy(prediction: PredictionResult): Promise<void> {
        const buyOrderModel = await makeAOrder(this.stockTrackerModel, prediction)
        const orderCode = await this.brokerPlugin.buy(buyOrderModel)
        await updateOrderCode(buyOrderModel, orderCode)
        this.strategy.onBuy(this.stockTrackerModel)
        Logger.debug((<any>buyOrderModel)._doc, "Investor [=> BUY ORDER]")
    }

    /**
     *
     *
     * @param {PredictionResult} prediction
     * @returns {Promise<void>}
     * @memberof Investor
     */
    async sell(prediction: PredictionResult): Promise<void> {
        const sellOrderModel = await makeAOrder(this.stockTrackerModel, prediction)
        const orderCode = await this.brokerPlugin.sell(sellOrderModel)
        await updateOrderCode(sellOrderModel, orderCode)
        this.strategy.onSell(this.stockTrackerModel)
        Logger.debug((<any>sellOrderModel)._doc, "Investor [<= SELL ORDER]")
    }

    /**
     *
     *
     * @param {OrderExecution} execution
     * @returns {Promise<void>}
     * @memberof Investor
     */
    async orderExecutionCallback(execution: OrderExecution): Promise<void> {
        await addOrderExecution(execution)
        processBalanceByExecution(execution, this.stockTrackerModel)
        onStockOrderExecution(execution, this.stockTrackerModel)
        const deviceToken = (<Account>this.stockTrackerModel.account).getActiveDevice().token
        notifyOrder(execution, deviceToken)
    }

}