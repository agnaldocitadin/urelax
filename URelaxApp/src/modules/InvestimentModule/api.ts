import { API, AppliedInvestiment, BrokerInvestiment, Brokers, FinancialAnalysis, FinancialAnalysisPeriod } from "honeybee-api"

const fragment = `
    _id
    brokerCode
    active
    type
    description
    stock {
        symbol
        stockLot
    }
`

export const fetchAppiedInvestiments = (brokerAccounts: string[]): Promise<AppliedInvestiment[]> => {
    return API.FinancialHistory.fetchAppiedInvestiments({ brokerAccounts }, `
        qty
        amount
        brokerAccountName
        refID
        investiment {
            _id
            brokerCode
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

export const fetchFinancialAnalysis = (brokerAccounts: string[], period: FinancialAnalysisPeriod): Promise<FinancialAnalysis[]> => {
    return API.FinancialHistory.fetchFinancialAnalysis({ brokerAccounts, period }, `
        label
        amount
        profit
        variation
        items {
            refID
            amount
            profit
            variation
            investiment {
                description
            }
        }
    `)
}

export const fetchAvailableInvestiments = (search: string, brokerCodes?: Brokers[]): Promise<BrokerInvestiment[]> => {
    return API.Broker.fetchAvailableInvestiments({ search, brokerCodes }, fragment)
}

export const fetchInvestimentSuggestion = async (account: string): Promise<BrokerInvestiment> => {
    return API.Broker.fetchInvestimentSuggestion({ account }, fragment)
}