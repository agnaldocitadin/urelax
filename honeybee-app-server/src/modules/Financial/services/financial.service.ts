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
    account: mongoose.Types.ObjectId
    date: Date
    page: number
    qty: number
}): Promise<FinancialHistory[]> => {
    
    const { account, date, page, qty } = options
    return FinancialHistoryModel.find({ account, ...date ? date : null })
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

/**
 *
 *
 * @param {{ account: mongoose.Types.ObjectId, date: Date, page: number, qty: number }} options
 * @returns {Promise<FinancialSummary[]>}
 */
export const groupFinancialSummaryBy = async (options: { account: mongoose.Types.ObjectId, date: Date, page: number, qty: number }): Promise<FinancialSummary[]> => {
    
    const history = await findFinancialHistoryBy(options)
    return history.map(dailyHistory => {

        let initial = 0
        let sum = 0
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
            when: dailyHistory.date.toISOString()
        }
    })
}

/**
 *
 *
 * @param {{ account: mongoose.Types.ObjectId, brokerAccount: mongoose.Types.ObjectId, date: Date, page: number, qty: number, period: FinancialAnalysisPeriod }} options
 * @returns {Promise<FinancialAnalysis[]>}
 */
export const groupFinancialAnalysisBy = (options: { account: mongoose.Types.ObjectId, brokerAccount: mongoose.Types.ObjectId, date: Date, page: number, qty: number, period: FinancialAnalysisPeriod }): Promise<FinancialAnalysis[]> => {
    // TODO
    // return Promise.resolve([])
    return Promise.resolve([
        {
            label: "01/Jan",
            amount: 15,
            variation: -2,
            items: [{
                amount: 651,
                refID: "",
                variation: .53,
                investiment: {
                    description: "Azul linhas (AZUL4)"
                }
            }]
        },{
            label: "02/Jan",
            amount: 10,
            variation: 1.23,
            items: [{
                amount: 123,
                refID: "",
                variation: 2.9,
                investiment: {
                    description: "Azul linhas (AZUL4)"
                }
            }]
        },{
            label: "03/Jan",
            amount: 20,
            variation: 4.65,
            items: [{
                amount: 21,
                refID: "",
                variation: 1.54,
                investiment: {
                    description: "Azul linhas (AZUL4)"
                }
            }]
        },{
            label: "04/Jan",
            amount: 45,
            variation: -1.4,
            items: [{
                amount: 213,
                refID: "",
                variation: 1.5,
                investiment: {
                    description: "Azul linhas (AZUL4)"
                }
            }]
        }
        
    ] as FinancialAnalysis[])
}