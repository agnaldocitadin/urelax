import { API } from "honeybee-api"

export const fetchFinancialHistory = (account: string, qty: number) => {
    return API.FinancialHistory.fetchFinancialHistory({ account, qty }, `
        date
        transactions {
            dateTime
            type
            value
        }
    `)
}