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
        fetchFinancialAnalysis(period: FinancialAnalysisPeriod): [FinancialAnalysis]
    `,
    resolvers: {
        fetchFinancialHistory: ({ account, date, page, qty }: any) => {
            return findFinancialHistoryBy(account, date, page, qty)
        },
        
        fetchFinancialSummary: ({ account, date, page, qty }: any) => {
            return groupFinancialSummaryBy(account, date, page, qty)
        },

        fetchAppiedInvestiments: ({ account }: any) => {
            return groupAppiedInvestimentsBy(account)
        },

        fetchFinancialAnalysis: ({ period }: any) => {
            return groupFinancialAnalysisBy(period)
        }
    }
}

export default entry