import { endOfDay, getMonth, getWeek, getYear, lastDayOfMonth, lastDayOfWeek, subMonths, subWeeks } from 'date-fns'
import { AppliedInvestiment, FinancialAnalysis, FinancialAnalysisPeriod, FinancialSummary, TransactionType } from 'honeybee-api'
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

    let aggregation = []
    let extraFields, match, start, end
    const _date = new Date(date)

    switch (period) {
        case FinancialAnalysisPeriod.DAILY:
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
                byWeek: {
                    "$lte": extractYearWeek(start),
                    "$gt": extractYearWeek(end)
                }
            }
            extraFields = {
                byWeek: { 
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
                byMonth: {
                    "$lte": extractYearMonth(start),
                    "$gt": extractYearMonth(end)
                }
            }
            extraFields = {
                byMonth: {
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
            extraFields = {
                byYear: { 
                    "$year": "$date"
                }
            }
            break
    }

    if (extraFields) {
        aggregation.push({ 
            "$addFields": extraFields 
        })
    }

    aggregation.push({
        "$match": { 
            ...account ? account : null,
            ...brokerAccount ? brokerAccount : null,
            ...match ? match : null
        }
    })

    const history = await FinancialHistoryModel.aggregate(aggregation)
    
    // const history = await FinancialHistoryModel.aggregate([
    //     { "$addFields": extraFields },
    //     {
    //         "$match": { 
    //             ...account ? account : null,
    //             ...brokerAccount ? brokerAccount : null,
    //             // date: { "$lte": reference },
    //             byWeek: { "$lte": 20209 }
    //         }
    //     },
    // ])

    // console.log(">>", getYear(_date))
    // console.log(">>", getISOWeek(_date))
    // console.log(">>", getMonth(_date))
    console.log(match)
    console.log(aggregation)
    // console.log(reference)
    // console.log(skip)
    console.log(history)

    // TODO
    return Promise.resolve([])
    // return Promise.resolve([
    //     {
    //         label: "01/Jan",
    //         amount: 15,
    //         variation: -2,
    //         items: [{
    //             amount: 651,
    //             refID: "",
    //             variation: .53,
    //             investiment: {
    //                 description: "Azul linhas (AZUL4)"
    //             }
    //         }]
    //     }
        // ,{
        //     label: "02/Jan",
        //     amount: 10,
        //     variation: 1.23,
        //     items: [{
        //         amount: 123,
        //         refID: "",
        //         variation: 2.9,
        //         investiment: {
        //             description: "Azul linhas (AZUL4)"
        //         }
        //     }]
        // },{
        //     label: "03/Jan",
        //     amount: 20,
        //     variation: 4.65,
        //     items: [{
        //         amount: 21,
        //         refID: "",
        //         variation: 1.54,
        //         investiment: {
        //             description: "Azul linhas (AZUL4)"
        //         }
        //     }]
        // },{
        //     label: "04/Jan",
        //     amount: 45,
        //     variation: -1.4,
        //     items: [{
        //         amount: 213,
        //         refID: "",
        //         variation: 1.5,
        //         investiment: {
        //             description: "Azul linhas (AZUL4)"
        //         }
        //     }]
        // }
        
    // ] as FinancialAnalysis[])
}

const extractYearWeek = (date: Date) => {
    const week = String(getWeek(date)).padStart(2, "0")
    const year = getYear(date)
    return Number(`${year}${week}`)
}

const extractYearMonth = (date: Date) => {
    const month = String(getMonth(date) + 1).padStart(2, "0")
    const year = getYear(date)
    return Number(`${year}${month}`)
}