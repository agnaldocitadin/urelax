import mongoose from 'mongoose'
import { FinancialHistory, FinancialHistoryModel, Transaction } from '../models'

export const initFinancialHistory = (account: mongoose.Types.ObjectId, date: Date) => {
    // TODO
}

export const addTransaction = (account: mongoose.Types.ObjectId, date: Date, transaction: Transaction) => {
    // TODO
}

export const findFinancialHistoryBy = (account: mongoose.Types.ObjectId, date: Date, page: number, qty: number): Promise<FinancialHistory[]> => {
    return FinancialHistoryModel.find().exec()
}