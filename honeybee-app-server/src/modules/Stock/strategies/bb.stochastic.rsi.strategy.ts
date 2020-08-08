import { startOfDay } from "date-fns"
import { StockTrackerStatus } from "honeybee-api"
import { arrays } from "js-commons"
import { ATR, BollingerBands, StochasticRSI } from "technicalindicators"
import { BollingerBandsOutput } from "technicalindicators/declarations/volatility/BollingerBands"
import Logger from "../../../core/Logger"
import { BrokerPlugin } from "../../Broker/plugins/broker.plugin"
import { OrderPlatforms, OrderSides, OrderTypes } from "../../Order/models/order.model"
import { StockHistory } from "../models/stock.history.model"
import { StockTracker } from "../models/stock.tracker.model"
import { getHistory } from "../services/stock.history.service"
import { destroyStockTracker, pauseStockTracker, playStockTracker, waitStockTrackerDestroy, waitStockTrackerPause } from "../services/stock.tracker.service"
import { InvestimentStrategy, PredictionResult } from "./investiment.strategy"
import { StochasticAnalizer, Trends } from "./stochastic.analizer"

const DATA_LENGTH = 150
const ANALIZE_CANDLES = 3
const STOPLOSS_FACTOR = 4.95
const ATR_PERIOD = 14
const BB_PERIOD = 14
const BB_STDDEV = 2
const K_PERIOD = 3
const D_PERIOD = 3
const STOCHASTIC_PERIOD = 14
const RSI_PERIOD = 14

type BBStochasticRSISummary = {
    trend: "hight" | "low" | "neutral"
    price: number
}

const randomIntFromInterval = (min: number, max: number) => {
    return Math.floor(Math.random() * (max - min + 1) + min)
}

/**
 *
 * @export
 * @class Strategy3
 * @implements {InvestimentStrategy}
 */
export class BBStochasticRSIStrategy implements InvestimentStrategy<BBStochasticRSISummary> {

    analizer: StochasticAnalizer
    priceBought: number
    lastBestPriceTrendUp: number
    hasAlreadyTouchedBottomBand: boolean
    stopLoss: number
    lastCandles: StockHistory[]
    bought: boolean

    constructor() {
        this.analizer = new StochasticAnalizer()
        this.lastCandles = []
        this.lastBestPriceTrendUp = 0
        this.stopLoss = 0
    }

    async prepare(referenceDate: Date, stockTracker: StockTracker, brokerPlugin: BrokerPlugin): Promise<void> {
        this.analizer.reset()
        this.reset()
    }

    async predict(referenceDate: Date, stockTracker: StockTracker, brokerPlugin: BrokerPlugin): Promise<PredictionResult> {
        
        this.bought = stockTracker.isBought()
        const symbol = stockTracker.getSymbol()
        const frequency = stockTracker.getFrequency()
        const history = await getHistory(symbol, referenceDate, frequency, DATA_LENGTH, true)
        
        if (this.hasEnoughData(history)) {
            const currentPrice = arrays.lastElement(history).closingPrice
            this.updateRSIStochastic(history)
    
            if (this.isTimeToBuy(history, stockTracker)) {
                return this.buy(currentPrice, stockTracker, brokerPlugin, symbol)
            }
    
            if (this.isTimeToSell(history, stockTracker)) {
                return this.sell(currentPrice, stockTracker)
            }
        }

        return this.emptyOrder()
    }

    /**
     *
     *
     * @private
     * @param {StockHistory[]} history
     * @returns
     * @memberof BBStochasticRSIStrategy
     */
    private hasEnoughData(history: StockHistory[]) {
        return history.length === DATA_LENGTH
    }

    /**
     *
     *
     * @private
     * @returns {PredictionResult}
     * @memberof BBStochasticRSIStrategy
     */
    private emptyOrder(): PredictionResult  {
        return { orderSide: null, orderType: null, platform: null }
    }

    /**
     *
     *
     * @private
     * @param {StockHistory[]} history
     * @memberof BBStochasticRSIStrategy
     */
    private updateRSIStochastic(history: StockHistory[]) {
        let rsiResult = StochasticRSI.calculate({ 
            values: history.map(event => event.closingPrice), 
            kPeriod: K_PERIOD, 
            dPeriod: D_PERIOD, 
            stochasticPeriod: STOCHASTIC_PERIOD,
            rsiPeriod: RSI_PERIOD
        })

        this.analizer.addValue({ 
            close: arrays.lastElement(history).closingPrice, 
            d: arrays.lastElement(rsiResult).d, 
            k: arrays.lastElement(rsiResult).k 
        })
    }

    /**
     *
     *
     * @private
     * @param {StockHistory[]} history
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private isTimeToBuy(history: StockHistory[], stockTracker: StockTracker): boolean {
        if (this.bought) return false
        
        const closes = history.map(event => event.closingPrice)
        const BBResult = BollingerBands.calculate({ values: closes, period: BB_PERIOD, stdDev: BB_STDDEV })
        const currentBB = arrays.lastElement(BBResult)
        const lastHistory = arrays.lastElement(history)
        const currentPrice = lastHistory.closingPrice
        
        const touchedBottomBand = lastHistory.lowestPrice < currentBB.lower
        if (touchedBottomBand && this.hasAlreadyTouchedBottomBand) {
            this.reset()
        }

        let isBuySignal = this.isBullishBuySignal(currentBB, lastHistory)
        if (isBuySignal) {
            this.stopLoss = this.defineStoploss(currentPrice, history)
            this.lastBestPriceTrendUp = currentPrice
            return true
        }
        
        if (touchedBottomBand) {
            this.hasAlreadyTouchedBottomBand = true
        }

        return false
    }

    /**
     *
     *
     * @private
     * @param {StockHistory[]} history
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private isTimeToSell(history: StockHistory[], stockTracker: StockTracker): boolean {
        if (!this.bought) return false

        const closes = history.map(event => event.closingPrice)
        const currentPrice = arrays.lastElement(closes)

        if (currentPrice > this.lastBestPriceTrendUp) {
            this.updateStopLoss(currentPrice)
            this.lastBestPriceTrendUp = currentPrice
        }
        
        let sellSignals = []
        sellSignals.push(this.sellByTrendingChange())
        sellSignals.push(this.sellByStopLoss(currentPrice))
        return sellSignals.some(rule => rule)
    }

    /**
     *
     *
     * @private
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private sellByTrendingChange(): boolean {
        if (this.analizer.getTrend() === Trends.DOWN && this.analizer.isAtTop()) {
            return true
        }
    }

    /**
     *
     *
     * @private
     * @memberof BBStochasticRSIStrategy
     */
    private reset() {
        this.lastCandles = []
        this.lastBestPriceTrendUp = 0
        this.hasAlreadyTouchedBottomBand = false
        this.stopLoss = 0
        this.priceBought = 0
    }

    /**
     *
     *
     * @private
     * @param {number} currentPrice
     * @memberof BBStochasticRSIStrategy
     */
    private updateStopLoss(currentPrice: number) {
        this.stopLoss += currentPrice - this.lastBestPriceTrendUp
    }

    /**
     *
     *
     * @private
     * @param {BollingerBandsOutput} bollingerBands
     * @param {StockHistory} history
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private isBullishBuySignal(bollingerBands: BollingerBandsOutput, history: StockHistory): boolean {
        if (!this.hasAlreadyTouchedBottomBand) return false
        
        this.lastCandles.push(history)
        if (this.find3BullishCandle(bollingerBands) && this.isSecondCandleBelowAverage(bollingerBands)) {
            this.priceBought = history.closingPrice
            return this.confirmPriceTrend()
        }
    }

    /**
     *
     *
     * @private
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private confirmPriceTrend(): boolean {
        return this.analizer.getTrend() !== Trends.DOWN
    }

    /**
     *
     *
     * @private
     * @param {BollingerBandsOutput} bollingerBands
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private isSecondCandleBelowAverage(bollingerBands: BollingerBandsOutput): boolean {
        let candles = arrays.lastElements(this.lastCandles, ANALIZE_CANDLES)
        let firstTwoCandlesBelowAverage = arrays.firstElements(candles, 2).every(candle => candle.closingPrice <= bollingerBands.middle)
        let lastOneCandleBelowAverage = arrays.lastElement(candles).closingPrice <= bollingerBands.middle
        this.reset()
        return firstTwoCandlesBelowAverage && lastOneCandleBelowAverage
    }

    /**
     *
     *
     * @private
     * @param {number} price
     * @returns
     * @memberof BBStochasticRSIStrategy
     */
    private sellByStopLoss(price: number) {
        if (price < this.stopLoss) {
            return true
        }
    }

    /**
     *
     *
     * @private
     * @param {BollingerBandsOutput} currentBB
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private find3BullishCandle(currentBB: BollingerBandsOutput): boolean {
        if (this.lastCandles.length < ANALIZE_CANDLES) return false
        const threeLastCandles = arrays.lastElements(this.lastCandles, ANALIZE_CANDLES)
        const candles = threeLastCandles.filter(candle => candle.lowestPrice > currentBB.lower)
        return candles.length === ANALIZE_CANDLES && candles.every(candle => this.isBullish(candle))
    }

    /**
     *
     *
     * @private
     * @param {StockHistory} candle
     * @returns {boolean}
     * @memberof BBStochasticRSIStrategy
     */
    private isBullish(candle: StockHistory): boolean {
        return candle.openingPrice <= candle.closingPrice
    }

    /**
     * 
     *
     * @private
     * @param {number} price
     * @param {StockTracker} stockTracker
     * @param {BrokerPlugin} brokerPlugin
     * @param {OrderPlatforms} platform
     * @param {string} symbol
     * @returns {Promise<number>}
     * @memberof BBStochasticRSIStrategy
     */
    private async defineBuyStockQuantity(price: number, stockTracker: StockTracker, brokerPlugin: BrokerPlugin, platform: OrderPlatforms, symbol: string): Promise<number> {
        let availableAmount = await brokerPlugin.totalAvailableAmount(stockTracker, platform, OrderSides.BUY, symbol)
        let { autoAmountLimit, stockAmountLimit } = stockTracker.strategySetting
        let limit = autoAmountLimit ? availableAmount : Math.min(...[availableAmount, stockAmountLimit])
        let stockLot = stockTracker.getStockLot()
        let lotQuantity = Math.floor((limit / price) / stockLot)
        let stockQuantity = lotQuantity * stockLot
        if (stockQuantity === 0) {
            Logger.warn("Insuficient amount to buy %s {$%s}", symbol, price)
        }
        return stockQuantity
    }

    /**
     * 
     *
     * @private
     * @param {StockTracker} stockTracker
     * @returns {number}
     * @memberof BBStochasticRSIStrategy
     */
    private async defineSellStockQuantity(stockTracker: StockTracker): Promise<number> {
        return Promise.resolve(stockTracker.qty)
    }

    /**
     *
     *
     * @private
     * @param {number} price
     * @param {StockHistory[]} history
     * @returns
     * @memberof BBStochasticRSIStrategy
     */
    private defineStoploss(price: number, history: StockHistory[]) {
        let ATRResult = ATR.calculate({
            close: history.map(event => event.closingPrice),
            low: history.map(event => event.lowestPrice),
            high: history.map(event => event.highestPrice),
            period: ATR_PERIOD
        })

        let ATRValue = arrays.lastElement(ATRResult)
        return price - (ATRValue * STOPLOSS_FACTOR)
    }

    /**
     *
     *
     * @private
     * @param {number} price
     * @param {StockTracker} stockTracker
     * @param {BrokerPlugin} brokerPlugin
     * @param {string} symbol
     * @returns {Promise<PredictionResult>}
     * @memberof BBStochasticRSIStrategy
     */
    private async buy(price: number, stockTracker: StockTracker, brokerPlugin: BrokerPlugin, symbol: string): Promise<PredictionResult> {
        let quantity = await this.defineBuyStockQuantity(price, stockTracker, brokerPlugin, OrderPlatforms.SWINGTRADE, symbol)
        if (quantity > 0) {
            return {
                platform: OrderPlatforms.SWINGTRADE,
                orderSide: OrderSides.BUY,
                orderType: OrderTypes.LIMIT,
                expiresAt: startOfDay(new Date()),
                quantity,
                price,
            }
        }

        return this.emptyOrder()
    }

    /**
     *
     *
     * @private
     * @param {number} price
     * @param {StockTracker} stockTracker
     * @returns {PredictionResult}
     * @memberof BBStochasticRSIStrategy
     */
    private async sell(price: number, stockTracker: StockTracker): Promise<PredictionResult> {
        let quantity = await this.defineSellStockQuantity(stockTracker)
        this.reset()
        return {
            platform: OrderPlatforms.SWINGTRADE,
            orderSide: OrderSides.SELL,
            orderType: OrderTypes.LIMIT,
            expiresAt: startOfDay(new Date()),
            quantity,
            price
        }
    }

    proceedStockTrackerPlay(stockTracker: StockTracker): Promise<StockTracker> {
        return playStockTracker(stockTracker)
    }

    async proceedStockTrackerPause(stockTracker: StockTracker): Promise<StockTracker> {
        let sold = stockTracker.isSold()
        if (sold) return pauseStockTracker(stockTracker, false)
        return waitStockTrackerPause(stockTracker)
    }

    async proceedStockTrackerDestroy(stockTracker: StockTracker): Promise<StockTracker> {
        let sold = stockTracker.isSold()
        if (sold) return destroyStockTracker(stockTracker, false)
        return waitStockTrackerDestroy(stockTracker)
    }

    onBuy(stockTracker: StockTracker): void {}

    onSell(stockTracker: StockTracker): void {
        switch(stockTracker.status) {
            case StockTrackerStatus.WAITING_PAUSE:
                pauseStockTracker(stockTracker, true)
                break
            
            case StockTrackerStatus.WAITING_DESTROY:
                destroyStockTracker(stockTracker, true)
                break
        }
    }

    summary(): BBStochasticRSISummary {
        return {
            trend: "neutral",
            price: 0
        }
    }

}