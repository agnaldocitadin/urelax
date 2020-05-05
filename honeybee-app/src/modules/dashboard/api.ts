import { Activity, API, BalanceSheetHistorySummary, BalanceSheetSummary } from "honeybee-api"

export const fetchCurrentBalanceSheetByUser = async (userAccountId?: string): Promise<BalanceSheetSummary> => {
    if (!userAccountId) return Promise.reject("userAccountId not provided")
    return API.fetchBalanceSheetByUserQuery(userAccountId, `
        amount
        credits
        stocks
    `)
}

export const fetchLastBalancesSheets = async (userAccountId?: string, qty: number = 1): Promise<BalanceSheetHistorySummary[]> => {
    if (!userAccountId) return Promise.reject("userAccountId not provided")
    return API.fetchBalanceSheetHistoriesByUserQuery(userAccountId, new Date(), 0, qty, "day", `
        label
        profit
        amount
        amountVariation
        credits
        creditVariation
        stocks
        stockVariation
    `)
}

export const fetchLastUserActivity = async (userAccountId?: string): Promise<Activity> => {
    if (!userAccountId) return Promise.reject("userAccountId not provided")
    let activities = await API.fetchUserActivitiesQuery(userAccountId, new Date(), 0, 1, `
        icon
        dateTime
        title
        details{
            title
            description
            hidden
        }`)
    return activities[0]
}