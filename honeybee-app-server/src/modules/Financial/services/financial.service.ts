import { AppliedInvestiment, FinancialAnalysis, FinancialAnalysisPeriod, FinancialSummary } from 'honeybee-api'
import mongoose from 'mongoose'
import { FinancialHistory, FinancialHistoryModel, Transaction } from '../models'

export const initFinancialHistory = (account: mongoose.Types.ObjectId, date: Date) => {
    // TODO
}

export const addTransaction = (account: mongoose.Types.ObjectId, date: Date, transaction: Transaction) => {
    // TODO
}

export const findFinancialHistoryBy = (account: mongoose.Types.ObjectId, date: Date, page: number, qty: number): Promise<FinancialHistory[]> => {
    // TODO
    return FinancialHistoryModel.find().exec()
}

export const groupAppiedInvestimentsBy = (account: mongoose.Types.ObjectId): Promise<AppliedInvestiment[]> => {
    // TODO
    return Promise.resolve([])
}

export const groupFinancialSummaryBy = (account: mongoose.Types.ObjectId, date: Date, page: number, qty: number): Promise<FinancialSummary[]> => {
    // TODO
    return Promise.resolve([])
    // return Promise.resolve([{
    //     patrimony: 100,
    //     variation: 1,
    //     when: "hoje"
    // },{
    //     patrimony: 200,
    //     variation: 2,
    //     when: "Ontem"
    // }])
}

export const groupFinancialAnalysisBy = (period: FinancialAnalysisPeriod): Promise<FinancialAnalysis[]> => {
    // TODO
    return Promise.resolve([])
}