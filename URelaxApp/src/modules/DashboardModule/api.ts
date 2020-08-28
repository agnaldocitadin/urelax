import { API } from "honeybee-api"

export const fetchFinancialSummary = (account: string, qty: number) => {
    return API.FinancialHistory.fetchFinancialSummary({ account, qty }, `
        when
        patrimony
        variation
    `)
}