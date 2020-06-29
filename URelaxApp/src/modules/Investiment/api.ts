import { API, AppliedInvestiment, FinancialAnalysisPeriod, FinancialHistory } from "honeybee-api"

export const fetchAppiedInvestiments = (accountID: string): Promise<AppliedInvestiment[]> => {
    return API.FinancialHistory.fetchAppiedInvestiments({ account: accountID }, `
        qty
        amount
        brokerAccountName
        refID
        investiment {
            broker {
                code
                name
            }
            type
            description
            active
            logo
            stock {
                symbol
            }
        }
    `)
}

export const fetchFinancialHistory = (accountID: string, page: number, qty: number, date?: Date): Promise<FinancialHistory[]> => {
    return API.FinancialHistory.fetchFinancialHistory({ account: accountID, page, qty, date: date?.toISOString() }, `
        _id
        date
        brokerAccount {
            accountName
        }
        transactions {
            dateTime
            type
            value
            investiment {
                type
                description
                stock {
                    symbol
                }
            }
        }
    `)
}

export const fetchFinancialAnalysis = (account: string, period: FinancialAnalysisPeriod) => {
    return API.FinancialHistory.fetchFinancialAnalysis({ account }, `
        label
        amount
        variation
        items {
            refID
            amount
            variation
        }
    `)
}