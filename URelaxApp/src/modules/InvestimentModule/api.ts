import { API, AppliedInvestiment, BrokerInvestiment, FinancialAnalysis, FinancialAnalysisPeriod, FinancialHistory } from "honeybee-api"

const fragment = `
    _id
    broker {
        code
    }
    active
    type
    description
    stock {
        symbol
        stockLot
    }
`

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

export const fetchFinancialAnalysis = (account: string, period: FinancialAnalysisPeriod): Promise<FinancialAnalysis[]> => {
    return API.FinancialHistory.fetchFinancialAnalysis({ account, period }, `
        label
        amount
        variation
        items {
            refID
            amount
            variation
            investiment {
                description
            }
        }
    `)
}

export const fetchAvailableInvestiments = (search: string, brokerIDs?: string[]): Promise<BrokerInvestiment[]> => {
    return API.Broker.fetchAvailableInvestiments({ search, brokerIDs }, fragment)
}

export const fetchInvestimentSuggestion = async (account: string): Promise<BrokerInvestiment> => {
    return API.Broker.fetchInvestimentSuggestion({ account }, fragment)
}