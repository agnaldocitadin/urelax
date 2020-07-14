import { API } from "honeybee-api"

// export const fetchFinancialHistory = (account: string, qty: number) => {
//     return API.FinancialHistory.fetchFinancialHistory({ account, qty }, `
//         date
//         transactions {
//             dateTime
//             type
//             value
//         }
//     `)
// }

export const fetchFinancialSummary = (account: string, qty: number) => {
    return API.FinancialHistory.fetchFinancialSummary({ account, qty }, `
        when
        patrimony
        variation
    `)
}