import { GraphQLModule } from "../GraphQL"
import { findFinancialHistoryBy } from "./services"

const entry: GraphQLModule = {
    types: `
        type Transaction {
            dateTime: Datetime
            type: String
            value: Float
            investiment: BrokerInvestiment
        }

        type FinancialHistory {
            _id: ID!
            date: Datetime
            acount: Account
            brokerAccount: BrokerAccount
            transactions: [Transaction]
            locked: Boolean
            createdAt: Datetime
            updatedAt: Datetime
        }

        type FinancialSummary {
            when: String
            patrimony: Float
            variation: Float
        }

        type AppliedInvestiment {
            investiment: BrokerInvestiment
            qty: Int
            amount: Float
        }
    `,
    queries: `
        fetchFinancialHistory(account: ID!, date: Datetime, page: Int, qty: Int): [FinancialHistory]
        fetchFinancialSummary(account: ID!, date: Datetime, page: Int, qty: Int): [FinancialSummary]
        fetchAppiedInvestiments(account: ID!): [AppliedInvestiment]
    `,
    resolvers: {
        fetchFinancialHistory: ({ account, date, page, qty }: any) => {
            return findFinancialHistoryBy(account, date, page, qty)
        },
        fetchFinancialSummary: ({ account, date, page, qty }: any) => {
            // TODO
            return Promise.resolve()
        },
        fetchAppiedInvestiments: ({ account }: any) => {
            // TODO
            return Promise.resolve()
        }
    }
}

export default entry