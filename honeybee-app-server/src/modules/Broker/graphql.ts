import { GraphQLModule } from "../GraphQL"
import { createBrokerAccount, updateBrokerAccountById } from "./services"

const entry: GraphQLModule = {
    types: `
        type Broker {
            _id: ID!
            code: String
            name: String
            logo: String
            active: Boolean
            investiments: [Investiment]
            createdAt: Datetime
            updatedAt: Datetime
        }

        type Investiment {
            _id: ID
            type: String
            description: String
            active: Boolean
            logo: String
            stock: StockInfo
        }

        type StockInfo {
            symbol: String
            stockLot: Float
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
    `,
    // mutations: `
    //     createBrokerAccount(brokerAccount: BrokerAccountInput!): BrokerAccount
    //     updateBrokerAccount(_id: ID!, brokerAccount: BrokerAccountInput!): Boolean
    // `,
    resolvers: {
        createBrokerAccount: ({ brokerAccount }: any) => {
            return createBrokerAccount(brokerAccount)
        },

        updateBrokerAccount: ({ _id, brokerAccount }: any) => {
            return updateBrokerAccountById(_id, brokerAccount)
        }
    }
}

export default entry