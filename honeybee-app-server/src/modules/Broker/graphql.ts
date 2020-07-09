import mongoose from 'mongoose'
import { GraphQLModule } from "../GraphQL"
import { findAvailableInvestiments, findBrokerAccounts } from "./services"

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
            extraData: BrokerAccountExtraDataInput
        }

        input BrokerAccountExtraDataInput {
            token: String
            signature: String
            platformUID: String
            sessionId: String
            cpf: String
            passwd: String
            birthdate: Datetime
        }
    `,

    queries: `
        fetchBrokers(id: ID, code: String, active: Boolean): [Broker]
        fetchBrokerAccounts(id: ID, account: ID): [BrokerAccount]
        fetchAvailableInvestiments(brokerIDs: [ID], search: String!): [BrokerInvestiment]
    `,

    mutations: `
        createBrokerAccount(input: BrokerAccountInput!): BrokerAccount
        updateBrokerAccount(id: ID!, input: BrokerAccountInput!): Boolean
    `,
    
    resolvers: {
        fetchBrokers: ({ id, code, active }: any) => {
            // TODO
        },

        fetchBrokerAccounts: (options: {
            id: string
            account: string
        }) => {
            return findBrokerAccounts(options)
        },

        createBrokerAccount: ({ input }: any) => {
            // TOOD'
        },

        updateBrokerAccount: ({ id, input }: any) => {
            // TOOD'
        },

        fetchAvailableInvestiments: (options: {
            search?: string
            brokerIDs?: mongoose.Types.ObjectId[]
        }) => {
            return findAvailableInvestiments(options)
        }
    }
}

export default entry