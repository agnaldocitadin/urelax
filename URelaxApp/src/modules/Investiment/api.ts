import { API, AppliedInvestiment } from "honeybee-api"

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
