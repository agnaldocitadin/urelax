import { GraphQLModule } from "../GraphQL"
import { groupAppiedInvestimentsBy, groupFinancialAnalysisBy, groupFinancialSummaryBy } from "./services"

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
        fetchFinancialSummary(brokerAccounts: [ID]!, date: Datetime, page: Int, qty: Int): [FinancialSummary]
        fetchAppiedInvestiments(brokerAccounts: [ID]!): [AppliedInvestiment]
        fetchFinancialAnalysis(brokerAccounts: [ID]!, date: Datetime, page: Int, qty: Int, period: FinancialAnalysisPeriod): [FinancialAnalysis]
    `,
    resolvers: {
        fetchFinancialSummary: (options: any) => {
            return groupFinancialSummaryBy(options)
        },

        fetchAppiedInvestiments: ({ brokerAccounts }: any) => {
            return groupAppiedInvestimentsBy(brokerAccounts)
        },

        fetchFinancialAnalysis: (options: any) => {
            return groupFinancialAnalysisBy(options)
        }
    }
}

export default entry