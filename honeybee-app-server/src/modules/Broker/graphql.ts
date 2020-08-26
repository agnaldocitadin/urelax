import { Brokers, InvestimentType } from 'honeybee-api'
import mongoose from 'mongoose'
import { GraphQLModule } from "../GraphQL"
import { createBrokerAccount, findAvailableInvestiments, findBrokerAccounts, findBrokersBy, suggestAnInvestiment, updateBrokerAccountById } from "./services"

const entry: GraphQLModule = {
    types: `
        enum InvestimentType {
            STOCK
            CURRENCY
        }

        type Broker {
            _id: ID!
            code: String
            name: String
            logo: String
            active: Boolean
            createdAt: Datetime
            updatedAt: Datetime
        }

        type BrokerInvestiment {
            _id: ID
            broker: Broker
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
        fetchBrokers(id: ID, code: String, active: Boolean): [Broker]
        fetchBrokerAccounts(id: ID, account: ID): [BrokerAccount]
        fetchAvailableInvestiments(brokerIDs: [ID], search: String, types: [InvestimentType]): [BrokerInvestiment]
        fetchInvestimentSuggestion(account: ID): BrokerInvestiment
    `,

    mutations: `
        createBrokerAccount(input: BrokerAccountInput!): BrokerAccount
        updateBrokerAccount(id: ID!, input: BrokerAccountInput!): Boolean
    `,

    resolvers: {
        fetchBrokers: (options: { 
            id: mongoose.Types.ObjectId
            code: Brokers
            active: boolean 
        }) => {
            return findBrokersBy(options)
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
            brokerIDs?: mongoose.Types.ObjectId[],
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