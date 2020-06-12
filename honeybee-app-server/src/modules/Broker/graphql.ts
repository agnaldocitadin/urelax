import { GraphQLModule } from "../GraphQL"

const entry: GraphQLModule = {
    types: `
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
            type: String
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
            passwd: String
            birthdate: Datetime
        }

        type BrokerAccount {
            _id: ID!
            account: Account
            accountName: String
            brokerCode: String
            extraData: BrokerAccountExtraData
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

        input StockInvestimentInfoInput {
            symbol: String
            stockLot: Float
        }
    `,

    queries: `
        fetchBrokers(id: ID, code: String, active: Boolean): [Broker]
        fetchBrokerAccounts(id: ID, account: ID): [BrokerAccount]
    `,

    mutations: `
        createBrokerAccount(input: BrokerAccountInput!): BrokerAccount
        updateBrokerAccount(id: ID!, input: BrokerAccountInput!): Boolean
    `,
    
    resolvers: {
        fetchBrokers: ({ id, code, active }: any) => {
            // TODO
        },

        fetchBrokerAccounts: ({ id, account }: any) => {
            // TOOD'
        },

        createBrokerAccount: ({ input }: any) => {
            // TOOD'
        },

        updateBrokerAccount: ({ id, input }: any) => {
            // TOOD'
        }
    }
}

export default entry