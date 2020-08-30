import { endOfDay, format, getMonth, getWeek, getYear, isToday, isYesterday, lastDayOfMonth, lastDayOfWeek, startOfDay, startOfWeek, subMonths, subWeeks } from 'date-fns'
import { AppliedInvestiment, FinancialAnalysis, FinancialAnalysisItem, FinancialAnalysisPeriod, FinancialSummary } from 'honeybee-api'
import { arrays, utils } from 'js-commons'
import mongoose from 'mongoose'
import { BrokerInvestiment, BrokerInvestimentModel } from '../../Broker/models'
import { FinancialHistory, FinancialHistoryModel, Profit, Transaction } from '../models'

const STANDARD_QUERY_RESULT = 100

/**
 *
 *
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {Date} date
 * @returns
 */
const prepareHistory = async (brokerAccount: mongoose.Types.ObjectId, date: Date) => {
    const now = startOfDay(date)
    let financialHistory = await FinancialHistoryModel.findOne({ 
        brokerAccount, 
        date: now
    })

    if (financialHistory) {
        return financialHistory
    }

    financialHistory = await FinancialHistoryModel.findOne({
        brokerAccount,
        date: { "$lt": now }
    }).sort({ date: "desc" })

    if (financialHistory) {
        return FinancialHistoryModel.create({
            applications: financialHistory.applications,
            brokerAccount,
            date: now,
        })
    }
    else {
        return FinancialHistoryModel.create({
            brokerAccount,
            date: now
        })   
    }
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {Date} date
 * @param {mongoose.Types.ObjectId} investiment
 * @returns
 */
export const addInvestiment = async (brokerAccount: mongoose.Types.ObjectId, date: Date,
    investiment: mongoose.Types.ObjectId, refId?: mongoose.Types.ObjectId) => {
        
    const history = await prepareHistory(brokerAccount, date)
    if (!history.hasInvestiment(investiment)) {
        history.applications.push({
            investiment,
            amount: 0,
            refId
        })
        return history.save()
    }
    return history
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {Date} date
 * @param {mongoose.Types.ObjectId} investiment
 */
export const removeInvestiment = async (brokerAccount: mongoose.Types.ObjectId, date: Date, investiment: mongoose.Types.ObjectId) => {
    FinancialHistoryModel.update(
        { brokerAccount, date: startOfDay(date) },
        { "$pull": { applications : { investiment: investiment }}}
    ).exec()
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {Transaction} transaction
 * @returns
 */
export const addTransaction = async (brokerAccount: mongoose.Types.ObjectId, transaction: Transaction) => {
    const investimentId = (<BrokerInvestiment>transaction.investiment)._id
    const history = await addInvestiment(brokerAccount, transaction.dateTime, investimentId)
    const investiment = history.getInvestiment(investimentId)
    investiment.amount += transaction.value
    history.transactions.push(transaction)
    return history.save()
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId} brokerAccount
 * @param {Date} date
 * @param {Profit} profit
 * @returns
 */
export const addProfit = async (brokerAccount: mongoose.Types.ObjectId, date: Date, profit: Profit) => {
    const investimentId = (<BrokerInvestiment>profit.investiment)._id
    const history = await addInvestiment(brokerAccount, date, investimentId)
    history.profits.push(profit)
    return history.save()
}

/**
 *
 *
 * @param {{
 *     brokerAccounts?: mongoose.Types.ObjectId[]
 *     date?: Date
 *     page?: number
 *     qty?: number
 * }} options
 * @returns {Promise<FinancialHistory[]>}
 */
export const findFinancialHistoryBy = (options: {
    brokerAccounts?: mongoose.Types.ObjectId[]
    date?: Date
    page?: number
    qty?: number
}): Promise<FinancialHistory[]> => {
    
    const { 
        qty = STANDARD_QUERY_RESULT,
        brokerAccounts = [], 
        page = 0,
        date
    } = options

    return FinancialHistoryModel.find({
            brokerAccount: { "$in": brokerAccounts },
            ...utils.nonNull("date", date)
        })
        .sort({ "date": "desc" })
        .skip(page * qty)
        .limit(qty)
        .exec()
}

/**
 *
 *
 * @param {mongoose.Types.ObjectId[]} brokerAccounts
 * @returns {Promise<AppliedInvestiment[]>}
 */
export const groupAppiedInvestimentsBy = async (brokerAccounts: mongoose.Types.ObjectId[]): Promise<AppliedInvestiment[]> => {

    let appliedInvestiments: AppliedInvestiment[] = []
    await Promise.all(brokerAccounts.map(async brokerAccount => {
        const history = await FinancialHistoryModel.findOne({ brokerAccount })
            .populate("brokerAccount")
            .populate("applications.investiment")
            .sort({ "date": "desc" })

        history && history.applications.forEach(applic => {
            appliedInvestiments.push({
                brokerAccountName: history.getBrokerAccount()?.accountName,
                investiment: <any>applic.investiment,
                refID: applic.refId?.toHexString(),
                amount: applic.amount,
                qty: 0
            })
        })
    }))

    return appliedInvestiments
}

/**
 *
 *
 * @param {{ 
 *     brokerAccounts?: mongoose.Types.ObjectId[]
 *     date?: Date
 *     page?: number
 *     qty?: number
 * }} options
 * @returns {Promise<FinancialSummary[]>}
 */
export const groupFinancialSummaryBy = async (options: { 
    brokerAccounts?: mongoose.Types.ObjectId[]
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
            variation: utils.percentVariation(opening, closing),
            when: defineFinancialAnalysisLabel(dailyHistory.date, FinancialAnalysisPeriod.DAILY)
        }
    })
}

/**
 *
 *
 * @param {{ 
 *     brokerAccounts: mongoose.Types.ObjectId[]
 *     period?: FinancialAnalysisPeriod
 *     date?: Date
 *     page?: number
 *     qty?: number
 * }} options
 * @returns {Promise<FinancialAnalysis[]>}
 */
export const groupFinancialAnalysisBy = async (options: { 
    brokerAccounts: mongoose.Types.ObjectId[]
    period?: FinancialAnalysisPeriod
    date?: Date
    page?: number
    qty?: number
}): Promise<FinancialAnalysis[]> => {

    const { 
        period = FinancialAnalysisPeriod.DAILY,
        qty = STANDARD_QUERY_RESULT,
        brokerAccounts,
        date = Date.now(),
        page = 0
    } = options

    let aggregation = []
    let extraFields, match, start, end
    const _date = new Date(date)
    const _brokerAccounts = brokerAccounts.map(id => mongoose.Types.ObjectId(String(id)))

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
            brokerAccount: { "$in" : _brokerAccounts },
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
        return history.map(item => {
            const label = defineFinancialAnalysisLabel(item.date, period)
            const _history = FinancialHistoryModel.hydrate(item)
            return toFinancialAnalysis(label, _history.getOpeningValue(), _history.getClosingValue(), item.profits)
        })
    }

    const groupedHistory = arrays.groupBy(history, item => (<any>item).groupMatch)
    return Array.from(groupedHistory.keys()).map(group => {
        const arrayHistory = groupedHistory.get(group)
        const allProfits = Array.from(arrayHistory).flatMap(item => item.profits)
        const firstHistory = arrays.firstElement(arrayHistory)
        const lastHistory = arrays.lastElement(arrayHistory)
        const label = defineFinancialAnalysisLabel(firstHistory.date, period)
        const _first = FinancialHistoryModel.hydrate(firstHistory) 
        const _last = FinancialHistoryModel.hydrate(lastHistory)
        return toFinancialAnalysis(label, _first.getOpeningValue(), _last.getOpeningValue(), allProfits)
    })
}

/**
 *
 *
 * @param {string} label
 * @param {number} opening
 * @param {number} closing
 * @param {Profit[]} profits
 * @returns {FinancialAnalysis}
 */
const toFinancialAnalysis = (label: string, opening: number, closing: number, profits: Profit[]): FinancialAnalysis => {
    const investimentGroup = arrays.groupBy(profits ?? [], item => String(item.investiment))
    
    const items = Array.from(investimentGroup.keys()).map(investiment => {
        const investimentProfits = investimentGroup.get(investiment)
        const total = arrays.sum(investimentProfits, item => item.value)
        const investimentDB: any = BrokerInvestimentModel.findById(investiment).exec()
        
        return {
            amount: total,
            variation: opening && (total / opening) * 100,
            investiment: investimentDB
        } as FinancialAnalysisItem
    })

    return {
        label,
        variation: utils.percentVariation(opening, closing),
        amount: closing,
        items
    }
}

/**
 *
 *
 * @param {Date} date
 * @param {FinancialAnalysisPeriod} period
 * @returns
 */
const defineFinancialAnalysisLabel = (date: Date, period: FinancialAnalysisPeriod): string => {
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