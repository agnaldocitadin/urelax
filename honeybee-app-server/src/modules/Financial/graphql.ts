import { GraphQLModule } from "../GraphQL"

const entry: GraphQLModule = {
    types: `
        type Transaction {
            dateTime: Datetime
            type: String
            value: Float
        }

        type FinancialHistory {
            _id: ID!
            date: Datetime
            acount: Account
            transactions: [Transaction]
            locked: Boolean
            createdAt: Datetime
            updatedAt: Datetime
        }

        type FinancialSummary {
            label: String
        }
    `
}

export default entry