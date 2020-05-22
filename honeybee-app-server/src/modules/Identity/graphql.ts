import { GraphQLModule } from "../GraphQL"

const entry: GraphQLModule = {
    types: `
        type Profile {
            _id: ID!
            name: String
            nickname: String
            email: String
            password: String
            accounts: [Account]
            active: Boolean
            createdAt: Datetime
            updatedAt: Datetime
        }

        type Preferences {
            language: String
            receiveTradeNotification: Boolean
            receiveBalanceNotification: Boolean
            addStockTrackerPaused: Boolean
        }

        type Device {
            deviceId: String
            token: String
            active: Boolean
        }

        type Account {
            _id: ID!
            active: Boolean
            simulation: Boolean
            devices: [Device]
            preference: Preferences
        }
    `,

    inputs: `
        input ProfileInput {
            name: String
            nickname: String
            email: String
            password: String
            accounts: [String]
            active: Boolean
        }

        input AccountInput {
            active: Boolean
            devices: [DeviceInput]
            preference: [PreferenceInput]
        }

        input DeviceInput {
            deviceId: String
            token: String
            active: Boolean
        }

        input PreferenceInput {
            language: String
            receiveTradeNotification: Boolean
            receiveBalanceNotification: Boolean
            addStockTrackerPaused: Boolean
        }
    `,

    mutations: `
        updateProfile(id: ID!, input: ProfileInput!): Boolean
        createAccount(input: AccountInput!): Account
        updateAccount(id: ID!, input: AccountInput!): Boolean
        activateSimulationAccount(profile: ID!): String
    `,

    resolvers: {
        updateProfile: ({ id, input }: any) => {
        },
        
        createAccount: ({ input }: any) => {
        },

        updateAccount: ({ id, input }: any) => {
        },

        activateSimulationAccount: ({ profile }: any) => {
        }
    }
}

export default entry