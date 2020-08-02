import { endOfDay, format, getMonth, getWeek, getYear, isToday, isYesterday, lastDayOfMonth, lastDayOfWeek, startOfDay, startOfWeek, subMonths, subWeeks } from 'date-fns'
import { AppliedInvestiment, FinancialAnalysis, FinancialAnalysisItem, FinancialAnalysisPeriod, FinancialSummary, ProfitType } from 'honeybee-api'
import { arrays } from 'js-commons'
import mongoose from 'mongoose'
import { ErrorCodes } from '../../../core/error.codes'
import Logger from '../../../core/Logger'
import { nonNull, percentVariation } from '../../../core/Utils'
import { BrokerInvestimentModel } from '../../Broker/models'
import { StockTrackerModel } from '../../Stock/models'
import { FinancialHistory, FinancialHistoryModel, Transaction } from '../models'

const STANDARD_QUERY_RESULT = 100

/**
 *
 *
 * @param {mongoose.Types.ObjectId} account
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {Date} date
 * @returns
 */
export const initFinancialHistory = (account: mongoose.Types.ObjectId, brokerAccount: mongoose.Types.ObjectId, date: Date) => {
    return FinancialHistoryModel.create({
        date: startOfDay(date),
        brokerAccount,
        locked: false,
        account,
    })
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId} account
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {Date} date
 * @param {Transaction} transaction
 */
export const addTransaction = async (account: mongoose.Types.ObjectId, brokerAccount: mongoose.Types.ObjectId, date: Date, transaction: Transaction) => {
    let financialHistory = await FinancialHistoryModel.findOne({ 
        account, 
        brokerAccount, 
        date: startOfDay(date)
    })
    
    if (!financialHistory) {
        financialHistory = await initFinancialHistory(account, brokerAccount, date)
    }

    if (financialHistory?.locked) {
        Logger.throw(ErrorCodes.UNKNOWN, "oops")
    }

    financialHistory.transactions.push(transaction)
    return financialHistory.save()
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId} account
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {mongoose.Types.ObjectId} investiment
 * @param {Date} date
 * @param {ProfitType} type
 * @param {number} value
 */
export const addProfit = (
    account: mongoose.Types.ObjectId,
    brokerAccount: mongoose.Types.ObjectId,
    investiment: mongoose.Types.ObjectId, 
    date: Date, 
    type: ProfitType, 
    value: number
    ) => {

    if (value !== 0) {
        FinancialHistoryModel.updateOne(
            { account, brokerAccount, date: startOfDay(date) },
            { "$push": { profits: { type, value, investiment }}}
        ).exec()
    }
}

/**
 *
 *
 * @param {{
 *     account?: mongoose.Types.ObjectId
 *     brokerAccount?: mongoose.Types.ObjectId
 *     date?: Date
 *     page?: number
 *     qty?: number
 * }} options
 * @returns {Promise<FinancialHistory[]>}
 */
export const findFinancialHistoryBy = (options: {
    account?: mongoose.Types.ObjectId
    brokerAccount?: mongoose.Types.ObjectId
    date?: Date
    page?: number
    qty?: number
}): Promise<FinancialHistory[]> => {
    
    const { 
        account, 
        brokerAccount, 
        date,
        page = 0, 
        qty = STANDARD_QUERY_RESULT 
    } = options

    return FinancialHistoryModel.find({
            ...nonNull("account", account),
            ...nonNull("brokerAccount", brokerAccount),
            ...nonNull("date", date)
        })
        .sort({ "date": "desc" })
        .skip(page * qty)
        .limit(qty)
        .exec()
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId} account
 * @returns {Promise<AppliedInvestiment[]>}
 */
export const groupAppiedInvestimentsBy = async (account: mongoose.Types.ObjectId): Promise<AppliedInvestiment[]> => {
    const stockTackers = await StockTrackerModel.find({ account })
        .populate("brokerAccount")
        .populate({ 
            path: "stockInfo", 
            populate: { 
                path: "broker"
            }
        })
        .exec()
    
    // TODO investimento (Dinheiro)
    const stockInvestiments = stockTackers.map(tracker => tracker.toInvestiment())
    return [...stockInvestiments]
}


/**
 *
 *
 * @param {{ 
 *     account: mongoose.Types.ObjectId
 *     date?: Date
 *     page?: number
 *     qty?: number
 * }} options
 * @returns {Promise<FinancialSummary[]>}
 */
export const groupFinancialSummaryBy = async (options: { 
    account: mongoose.Types.ObjectId
    date?: Date
    page?: number
    qty?: number
}): Promise<FinancialSummary[]> => {
    
    const history = await findFinancialHistoryBy(options)
    return history.map(dailyHistory => {
        
        const opening = dailyHistory.getOpeningValue()
        const closing = dailyHistory.getClosingValue()

        return {
            patrimony: closing,
            variation: percentVariation(opening, closing),
            when: createFinancialAnalysisLabel(dailyHistory.date, FinancialAnalysisPeriod.DAILY)
        }
    })
}


/**
 *
 *
 * @param {{ 
 *     account: mongoose.Types.ObjectId
 *     brokerAccount?: mongoose.Types.ObjectId
 *     period?: FinancialAnalysisPeriod
 *     date?: Date
 *     page?: number
 *     qty?: number
 * }} options
 * @returns {Promise<FinancialAnalysis[]>}
 */
export const groupFinancialAnalysisBy = async (options: { 
    account: mongoose.Types.ObjectId
    brokerAccount?: mongoose.Types.ObjectId
    period?: FinancialAnalysisPeriod
    date?: Date
    page?: number
    qty?: number
}): Promise<FinancialAnalysis[]> => {

    const { 
        account,
        brokerAccount,
        period = FinancialAnalysisPeriod.DAILY,
        date = Date.now(),
        page = 0,
        qty = STANDARD_QUERY_RESULT
    } = options

    let aggregation = []
    let extraFields, match, start, end
    const _date = new Date(date)

    switch (period) {
        case FinancialAnalysisPeriod.DAILY:
            aggregation.push({ "$skip": page * qty })
            aggregation.push({ "$limit": qty })
            match = { 
                date: { 
                    "$lte": endOfDay(_date)
                }
            }
            break

        case FinancialAnalysisPeriod.WEEKLY:
            start = subWeeks(lastDayOfWeek(_date), page * qty)
            end = lastDayOfWeek(subWeeks(start, qty))
            match = {
                groupMatch: {
                    "$lte": extractYearWeek(start),
                    "$gt": extractYearWeek(end)
                }
            }
            extraFields = {
                groupMatch: { 
                    "$toInt": { 
                        "$dateToString": { 
                            date: "$date", 
                            format: "%Y%V" 
                        }
                    }
                }
            }
            break

        case FinancialAnalysisPeriod.MONTHLY:
            start = subMonths(lastDayOfMonth(_date), page * qty)
            end = lastDayOfMonth(subMonths(start, qty))
            match = {
                groupMatch: {
                    "$lte": extractYearMonth(start),
                    "$gt": extractYearMonth(end)
                }
            }
            extraFields = {
                groupMatch: {
                    "$toInt": {
                        "$dateToString": {
                            date: "$date",
                            format: "%Y%m"
                        }
                    }
                }
            }
            break

        case FinancialAnalysisPeriod.YEARLY:
            start = getYear(_date) - (page * qty)
            end = start - qty
            match = {
                groupMatch: {
                    "$lte": start,
                    "$gt": end
                }
            }
            extraFields = {
                groupMatch: { 
                    "$year": "$date"
                }
            }
            break
    }

    aggregation.unshift({ "$sort": { date: -1 }})
    aggregation.unshift({
        "$match": { 
            ...account ? { "account": mongoose.Types.ObjectId(String(account)) } : null,
            ...brokerAccount ? { "brokerAccount": mongoose.Types.ObjectId(String(brokerAccount)) } : null,
            ...match ? match : null
        }
    })

    if (extraFields) {
        aggregation.unshift({ 
            "$addFields": extraFields 
        })
    }

    const history: FinancialHistory[] = await FinancialHistoryModel.aggregate(aggregation)

    if (period === FinancialAnalysisPeriod.DAILY) {
        return history.map(item => toFinancialAnalysis(item, period))
    }

    // TODO Grouped history is not ready yet
    const groupedHistory = arrays.groupBy(history, item => (<any>item).groupMatch)
    return Array.from(groupedHistory.keys()).map(group => {
        const ult = arrays.lastElement(groupedHistory.get(group))
        return toFinancialAnalysis(ult, period)
    })
}

/**
 *
 *
 * @param {FinancialHistory} history
 * @param {FinancialAnalysisPeriod} period
 * @returns {FinancialAnalysis}
 */
const toFinancialAnalysis = (history: FinancialHistory, period: FinancialAnalysisPeriod): FinancialAnalysis => {

    const _history = FinancialHistoryModel.hydrate(history)
    const opening = _history.getOpeningValue()
    const closing = _history.getClosingValue()
    const investimentGroup = arrays.groupBy(history.profits ?? [], item => String(item.investiment))
    
    const items = Array.from(investimentGroup.keys()).map(investiment => {
        const investimentProfits = investimentGroup.get(investiment)
        const total = arrays.sum(investimentProfits, item => item.value)
        const investimentDB = <any>BrokerInvestimentModel.findById(investiment).exec() // FIXME
        
        return {
            amount: total,
            variation: (total / opening) * 100,
            investiment: investimentDB,
            refID: "--" //TODO
        } as FinancialAnalysisItem
    })

    return {
        label: createFinancialAnalysisLabel(history.date, period),
        variation: percentVariation(opening, closing),
        amount: closing,
        items
    } as FinancialAnalysis
}

/**
 *
 *
 * @param {Date} date
 * @param {FinancialAnalysisPeriod} period
 * @returns
 */
const createFinancialAnalysisLabel = (date: Date, period: FinancialAnalysisPeriod): string => {
    switch (period) {
        case FinancialAnalysisPeriod.DAILY:
            if (isToday(date)) return "Today"
            if (isYesterday(date)) return "Yesterday"
            return format(date, "dd/MMM")

        case FinancialAnalysisPeriod.WEEKLY:
            return format(startOfWeek(date), "dd/MMM")

        case FinancialAnalysisPeriod.MONTHLY:
            return format(date, "MMM/yyyy")

        case FinancialAnalysisPeriod.YEARLY:
            return getYear(date).toString()
    }
}

/**
 *
 *
 * @param {Date} date
 * @returns
 */
const extractYearWeek = (date: Date) => {
    const week = String(getWeek(date)).padStart(2, "0")
    const year = getYear(date)
    return Number(`${year}${week}`)
}

/**
 *
 *
 * @param {Date} date
 * @returns
 */
const extractYearMonth = (date: Date) => {
    const month = String(getMonth(date) + 1).padStart(2, "0")
    const year = getYear(date)
    return Number(`${year}${month}`)
}