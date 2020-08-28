import { Brokers, InvestimentType } from 'honeybee-api'
import { GraphQLModule } from "../GraphQL"
import { createBrokerAccount, findAvailableInvestiments, findBrokerAccounts, findBrokersBy, suggestAnInvestiment, updateBrokerAccountById } from "./services"

const entry: GraphQLModule = {
    types: `
        enum InvestimentType {
            STOCK
            CURRENCY
        }

        type Broker {
            code: String
            name: String
            logo: String
        }

        type BrokerInvestiment {
            _id: ID
            brokerCode: String
            type: InvestimentType
            description: String
            active: Boolean
            logo: String
            stock: StockInvestimentInfo
        }

        type StockInvestimentInfo {
            symbol: String
            stockLot: Int
        }

        type BrokerAccountExtraData {
            token: String
            signature: String
            platformUID: String
            sessionId: String
            cpf: String
            password: String
            birthdate: Datetime
        }

        type BrokerAccount {
            _id: ID!
            account: Account
            accountName: String
            brokerCode: String
            extraData: BrokerAccountExtraData
            simulation: Boolean
            createdAt: Datetime
            updatedAt: Datetime
        }
    `,

    inputs: `
        input BrokerAccountInput {
            account: String
            accountName: String
            brokerCode: String
            simulation: Boolean
            extraData: BrokerAccountExtraDataInput
        }

        input BrokerAccountExtraDataInput {
            token: String
            signature: String
            platformUID: String
            sessionId: String
            cpf: String
            password: String
            birthdate: Datetime
        }
    `,

    queries: `
        fetchBrokers(code: String): [Broker]
        fetchBrokerAccounts(id: ID, account: ID): [BrokerAccount]
        fetchAvailableInvestiments(brokerCodes: [String], search: String, types: [InvestimentType]): [BrokerInvestiment]
        fetchInvestimentSuggestion(account: ID): BrokerInvestiment
    `,

    mutations: `
        createBrokerAccount(input: BrokerAccountInput!): BrokerAccount
        updateBrokerAccount(id: ID!, input: BrokerAccountInput!): Boolean
    `,

    resolvers: {
        fetchBrokers: ({ code }: any) => {
            return findBrokersBy(code)
        },

        fetchBrokerAccounts: (options: {
            id: string
            account: string
        }) => {
            return findBrokerAccounts(options)
        },

        createBrokerAccount: ({ input }: any) => {
            return createBrokerAccount(input)
        },

        updateBrokerAccount: ({ id, input }: any) => {
            return updateBrokerAccountById(id, input)
        },

        fetchAvailableInvestiments: (options: {
            search?: string
            brokerCodes?: Brokers[],
            types?: InvestimentType[]
        }) => {
            return findAvailableInvestiments(options)
        },

        fetchInvestimentSuggestion: ({ account }: any) => {
            return suggestAnInvestiment(account)
        }
    }
}

export default entry