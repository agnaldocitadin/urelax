import { AppliedInvestiment, FinancialAnalysis, FinancialAnalysisPeriod, FinancialSummary, InvestimentType } from 'honeybee-api'
import mongoose from 'mongoose'
import { FinancialHistory, Transaction } from '../models'

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
    // TODO
    return Promise.resolve([
        {
            date: new Date(),
            transactions: [{
                dateTime: new Date(),
                value: 230
            },{
                dateTime: new Date(),
                value: 40
            }]
        }
    ] as FinancialHistory[])
}

export const groupAppiedInvestimentsBy = (account: mongoose.Types.ObjectId): Promise<AppliedInvestiment[]> => {
    // TODO
    // return Promise.resolve([])
    return Promise.resolve([
        {
            brokerAccountName: "0001-0",
            amount: 234.43,
            qty: 10,
            investiment: {
                type: InvestimentType.CURRENCY,
                description: "Real (R$)",
                broker:{
                    name: "Clear"
                }
            }
        },{
            brokerAccountName: "0001-0",
            amount: 839.76,
            qty: 10,
            investiment: {
                type: InvestimentType.CURRENCY,
                description: "Dollar (US$)",
                broker:{
                    name: "Easyinvest"
                }
            }
        },{
            brokerAccountName: "0123456",
            amount: 203000,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "Azul Linhas Aéreas (AZUL4)",
                broker: {
                    name: "XP Investimentos"
                }
            }
        },{
            brokerAccountName: "0001-0",
            amount: 1293,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "Lojas Renner (RENN3)",
                broker: {
                    name: "Modalmais"
                }
            }
        },{
            brokerAccountName: "Nova conta",
            amount: 42933,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "Ambev Bebidas LTDA (ABEV3)",
                broker: {
                    name: "Rico"
                }
            }
        },{
            brokerAccountName: "Nova conta",
            amount: 2342,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "WEG Motores Elétricos (WEGE3)",
                broker: {
                    name: "Rico"
                }
            }
        },{
            brokerAccountName: "0123456",
            amount: 203000,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "Azul Linhas Aéreas (AZUL4)",
                broker: {
                    name: "XP Investimentos"
                }
            }
        },{
            brokerAccountName: "0001-0",
            amount: 1293,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "Lojas Renner (RENN3)",
                broker: {
                    name: "Modalmais"
                }
            }
        },{
            brokerAccountName: "Nova conta",
            amount: 42933,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "Ambev Bebidas LTDA (ABEV3)",
                broker: {
                    name: "Rico"
                }
            }
        },{
            brokerAccountName: "Nova conta",
            amount: 2342,
            qty: 10,
            refID: "5ebc4d17232404081827fb5f",
            investiment: {
                type: InvestimentType.STOCK,
                description: "WEG Motores Elétricos (WEGE3)",
                broker: {
                    name: "Rico"
                }
            }
        }
    ] as AppliedInvestiment[])
    
}

export const groupFinancialSummaryBy = (options: {
    account: mongoose.Types.ObjectId
    date: Date
    page: number
    qty: number
}): Promise<FinancialSummary[]> => {
    // TODO
    // return Promise.resolve([])
    return Promise.resolve([{
        patrimony: 128989,
        variation: 1,
        when: "Today"
    },{
        patrimony: 200,
        variation: -1.21,
        when: "Yesterday"
    },{
        patrimony: 187,
        variation: 1.58,
        when: "03/Jan"
    },{
        patrimony: 18734,
        variation: 2.58,
        when: "02/Jan"
    },{
        patrimony: 1734,
        variation: 4.58,
        when: "01/Jan"
    }])
}

export const groupFinancialAnalysisBy = (options: {
    account: mongoose.Types.ObjectId, 
    brokerAccount: mongoose.Types.ObjectId, 
    date: Date, 
    page: number, 
    qty: number, 
    period: FinancialAnalysisPeriod
}): Promise<FinancialAnalysis[]> => {
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