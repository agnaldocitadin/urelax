import { endOfDay, format, getMonth, getWeek, getYear, isToday, isYesterday, lastDayOfMonth, lastDayOfWeek, startOfWeek, subMonths, subWeeks } from 'date-fns'
import { AppliedInvestiment, FinancialAnalysis, FinancialAnalysisItem, FinancialAnalysisPeriod, FinancialSummary, TransactionType } from 'honeybee-api'
import { arrays } from 'js-commons'
import mongoose from 'mongoose'
import { percentVariation } from '../../../core/Utils'
import { StockTrackerModel } from '../../Stock/models'
import { FinancialHistory, FinancialHistoryModel, Transaction } from '../models'


export const initFinancialHistory = (account: mongoose.Types.ObjectId, date: Date) => {
    // TODO
}


export const addTransaction = (account: mongoose.Types.ObjectId, date: Date, transaction: Transaction) => {
    // TODO
}


export const findFinancialHistoryBy = (options: {
    account?: mongoose.Types.ObjectId
    brokerAccount?: mongoose.Types.ObjectId
    date?: Date
    page: number
    qty: number
}): Promise<FinancialHistory[]> => {
    
    const { account, brokerAccount, date, page, qty } = options
    return FinancialHistoryModel.find({ 
            ...account ? account : null, 
            ...date ? date : null, 
            ...brokerAccount ? brokerAccount : null 
        })
        .sort({ "date": "desc" })
        .skip(page * qty)
        .limit(qty)
        .exec()
}

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


export const groupFinancialSummaryBy = async (options: { 
    account: mongoose.Types.ObjectId
    date: Date
    page: number
    qty: number
}): Promise<FinancialSummary[]> => {
    
    const history = await findFinancialHistoryBy(options)
    return history.map(dailyHistory => {

        let initial = 0, sum = 0
        dailyHistory.transactions.forEach(transaction => {
            if (transaction.type === TransactionType.STATEMENT_OPENING) {
                initial += transaction.value
                return
            }
            sum += transaction.value
        })

        const patrimony = sum + initial
        return {
            patrimony,
            variation: percentVariation(initial, patrimony),
            when: `When ${dailyHistory.date}`
        }
    })
}


export const groupFinancialAnalysisBy = async (options: { 
    account?: mongoose.Types.ObjectId
    brokerAccount?: mongoose.Types.ObjectId
    period?: FinancialAnalysisPeriod
    date?: Date
    page: number
    qty: number
}): Promise<FinancialAnalysis[]> => {

    const { 
        account,
        brokerAccount,
        period,
        date,
        page,
        qty
    } = options

    let aggregation = [], extra = []
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

    aggregation.unshift({
        "$match": { 
            ...account ? account : null,
            ...brokerAccount ? brokerAccount : null,
            ...match ? match : null
        }
    })

    if (extraFields) {
        aggregation.unshift({ 
            "$addFields": extraFields 
        })
    }

    const history = await FinancialHistoryModel.aggregate(aggregation).sort({ date: "desc" })

    if (period === FinancialAnalysisPeriod.DAILY) {
        return history.map(item => toFinancialAnalysis([item], period))
    }

    const groupedHistory = arrays.groupBy(history, item => item.groupMatch)
    return Array.from(groupedHistory.keys()).map(group => toFinancialAnalysis(groupedHistory.get(group), period))
}

const toFinancialAnalysis = (history: any[], period: FinancialAnalysisPeriod): FinancialAnalysis => {
     // console.log(key)
    //  console.log(group.get(key))

    //  const values = group.get(key)
     const first = arrays.firstElements(history, 1)[0]
     const last = arrays.lastElement(history)

    //  // console.log("f>", first)
    //  // console.log("l>", last)

     return {
         label: createFinancialAnalysisLabel(first.date, period),
         amount: 0,
         variation: 0,
         items: [
             {
                 amount: 0,
                 refID: "ref",
                 variation: 0,
                 investiment: {}
             }
         ] as FinancialAnalysisItem[]
     } as FinancialAnalysis
}

/**
 *
 *
 * @param {Date} date
 * @param {FinancialAnalysisPeriod} period
 * @returns
 */
const createFinancialAnalysisLabel = (date: Date, period: FinancialAnalysisPeriod) => {
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
            return getYear(date)
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