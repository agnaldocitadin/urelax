import { StockTrackerStatus } from "honeybee-api"
import Logger from "../../../core/Logger"
import { onStockOrderExecution } from "../../Activity/services"
import { AdapterCallbacks, BrokerPlugin, OrderExecution } from "../../Broker/plugins"
import { Account } from "../../Identity/models"
import { notifyOrder } from "../../Notification/services"
import { OrderSides } from "../../Order/models"
import { addOrderExecution, updateOrderCode } from "../../Order/services"
import { StockTracker } from "../models"
import { makeStockOrder, registerUpdate, STOCK_TRACKER_STATUS_DONT_UPDATE } from "../services"
import { InvestimentStrategy, PredictionResult } from "../strategies"
import { StockTrackerFrequency } from "./stock.tracker.frequency"

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
        const buyOrderModel = await makeStockOrder(this.stockTrackerModel, prediction)
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
        const sellOrderModel = await makeStockOrder(this.stockTrackerModel, prediction)
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
        onStockOrderExecution(execution, this.stockTrackerModel)
        const deviceToken = (<Account>this.stockTrackerModel.account).getActiveDevice().token
        notifyOrder(execution, deviceToken)
    }

}