import { format, set } from 'date-fns'
import { ErrorCodes } from '../core/error.codes.d'
import { ts } from '../core/i18n'
import Logger from '../core/Logger'
import { StockHistory, StockHistoryModel } from '../models/stock.history.model'
import { STFrequencyDef } from '../stock-tracker/stock.tracker.frequency'
import { PredictionData } from '../strategies/investiment.strategy'

/**
 *
 *
 * @param {string} symbol
 * @param {number} price
 * @param {number} volume
 * @param {number} tradeDate
 * @returns {Promise<StockHistory>}
 */
export const registerChange = async (symbol: string, price: number, volume: number, tradeDate: number): Promise<StockHistory> => {
    if (price <= 0) return
    
    const _tradeDate = set(tradeDate, { seconds: 0, milliseconds: 0})
    Logger.info("[StockHistory price update] > %s @ $%s", symbol, price)

    let stockHistory = await StockHistoryModel.findOne({ symbol, date: _tradeDate }).exec()
    if (stockHistory) {
        
        if (price > stockHistory.highestPrice) {
            stockHistory.highestPrice = price
        }

        if (price < stockHistory.lowestPrice) {
            stockHistory.lowestPrice = price
        }

        stockHistory.closingPrice = price
        stockHistory.volume = volume
        return stockHistory.save()
    }

    return StockHistoryModel.create({
        symbol,
        volume,
        date: _tradeDate,
        openingPrice: price,
        closingPrice: price,
        highestPrice: price,
        lowestPrice: price
    })
}

/**
 *
 *
 * @param {string} symbol
 * @param {Date} lastDateTime
 * @param {STFrequencyDef} frequency
 * @param {number} period
 * @param {boolean} [orderByTime=false]
 * @returns {Promise<StockHistory[]>}
 */
export const getHistory = async (symbol: string, lastDateTime: Date, frequency: STFrequencyDef, period: number, orderByTime: boolean = false): Promise<StockHistory[]> => {

    const numRecords = period * frequency.inMinutes
    const stockHistories = await StockHistoryModel
        .find({ symbol, date: { "$lte": lastDateTime }})
        .sort({ "date": "desc" })
        .limit(numRecords)
        .exec()

    const stockHistoryGroup: StockHistory[] = stockHistories.reduce((stockHistoryGroup, history, index) => {
        if (index % frequency.inMinutes === 0) {
            stockHistoryGroup.push(history)
            return stockHistoryGroup
        }

        let lastHistory = stockHistoryGroup[stockHistoryGroup.length - 1]
        lastHistory.openingPrice = history.openingPrice
        if (lastHistory.lowestPrice > history.lowestPrice) lastHistory.lowestPrice = history.lowestPrice
        if (lastHistory.highestPrice < history.highestPrice) lastHistory.highestPrice = history.highestPrice
        if (lastHistory.volume < history.volume) lastHistory.volume = history.volume
        return stockHistoryGroup

    }, [])

    if (orderByTime) {
        stockHistoryGroup.sort((historyA, historyB) => historyA.date.getTime() - historyB.date.getTime())
    }

    return stockHistoryGroup
}

/**
 *
 *
 * @param {string} symbol
 * @param {Date} date
 * @returns {Promise<number>}
 */
export const getLastClosingPrice = async (symbol: string, date: Date): Promise<number> => {
    let endDate = set(date, { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
    endDate.setUTCHours(23)
    endDate.setUTCMinutes(59)
    endDate.setUTCSeconds(59)
    endDate.setUTCMilliseconds(999)
    
    const lastPrice = await StockHistoryModel.findOne({ symbol, date: { "$lte": endDate }}).sort({ "date": "desc" }).limit(1)
    if (lastPrice) {
        return lastPrice.closingPrice
    }

    Logger.throw(ErrorCodes.LAST_PRICE_NOT_FOUND, ts("last_price_not_found", { symbol, date }))
}

/**
 *
 *
 * @param {StockHistory[]} stockHistory
 * @returns {PredictionData[]}
 */
const convertToPredictionData = (stockHistory: StockHistory[]): PredictionData[] => {
    return stockHistory.map(history => ({
        date: history.date,
        open: history.openingPrice,
        low: history.lowestPrice,
        high: history.highestPrice,
        close: history.closingPrice
    }))
}