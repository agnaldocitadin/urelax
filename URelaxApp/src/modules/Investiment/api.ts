import { API, AppliedInvestiment, FinancialHistory } from "honeybee-api"

export const fetchAppiedInvestiments = (accountID: string): Promise<AppliedInvestiment[]> => {
    return API.FinancialHistory.fetchAppiedInvestiments({ account: accountID }, `
        qty
        amount
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
            name
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