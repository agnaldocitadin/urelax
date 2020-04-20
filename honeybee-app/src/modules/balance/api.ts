import { API, BalanceSheetHistorySummary, GroupBy } from "honeybee-api"

export const fetchBalanceSheetHistoriesByUserQuery = async (userAccountId: string, date: Date, page: number, qty: number, groupBy: GroupBy): Promise<BalanceSheetHistorySummary[]> => {
    return API.fetchBalanceSheetHistoriesByUserQuery(userAccountId, date, page, qty, groupBy, `
        label
        amount
        amountVariation
        credits
        creditVariation
        stocks
        stockVariation
    `)
}