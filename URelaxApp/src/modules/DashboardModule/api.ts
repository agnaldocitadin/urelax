import { API } from 'urelax-api'

export const fetchFinancialSummary = (brokerAccounts: string[], qty: number) => {
    return API.FinancialHistory.fetchFinancialSummary({ brokerAccounts, qty }, `
        when
        patrimony
        variation
    `)
}