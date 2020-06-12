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
            label: String
        }
    `,
    queries: `
        fetchFinancialHistory(account: ID!, date: Datetime, page: Int, qty: Int): [FinancialHistory]
    `,
    resolvers: {
        fetchFinancialHistory: ({ account, date, page, qty }: any) => {
            return findFinancialHistoryBy(account, date, page, qty)
        }
    }
}

export default entry