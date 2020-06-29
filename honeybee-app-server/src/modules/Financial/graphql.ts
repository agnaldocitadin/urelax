import { GraphQLModule } from "../GraphQL"
import { findFinancialHistoryBy, groupAppiedInvestimentsBy, groupFinancialAnalysisBy, groupFinancialSummaryBy } from "./services"

const entry: GraphQLModule = {
    types: `
        enum TransactionType {
            STATEMENT_OPENING
            DESPOSIT
            TRANSFER
            YIELD
        }

        enum FinancialAnalysisPeriod {
            DAILY
            WEEKLY
            MONTHLY
            YEARLY
        }

        type Transaction {
            dateTime: Datetime
            type: TransactionType
            value: Float
            investiment: BrokerInvestiment
        }

        type FinancialHistory {
            _id: ID
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
            brokerAccountName: String
            refID: ID
            amount: Float
            qty: Int
        }

        type FinancialAnalysis {
            label: String
            amount: Float
            variation: Float
            items: [FinancialAnalysisItem]
        }
        
        type FinancialAnalysisItem {
            refID: ID
            investiment: BrokerInvestiment
            amount: Float
            variation: Float
        }
    `,
    queries: `
        fetchFinancialHistory(account: ID!, date: Datetime, page: Int, qty: Int): [FinancialHistory]
        fetchFinancialSummary(account: ID!, date: Datetime, page: Int, qty: Int): [FinancialSummary]
        fetchAppiedInvestiments(account: ID!): [AppliedInvestiment]
        fetchFinancialAnalysis(account: ID!, brokerAccount: ID, date: Datetime, page: Int, qty: Int, period: FinancialAnalysisPeriod): [FinancialAnalysis]
    `,
    resolvers: {
        fetchFinancialHistory: (options: any) => {
            return findFinancialHistoryBy(options)
        },
        
        fetchFinancialSummary: (options: any) => {
            return groupFinancialSummaryBy(options)
        },

        fetchAppiedInvestiments: ({ account }: any) => {
            return groupAppiedInvestimentsBy(account)
        },

        fetchFinancialAnalysis: (options: any) => {
            return groupFinancialAnalysisBy(options)
        }
    }
}

export default entry