import { GraphQLModule } from "../GraphQL"
import { activateSimulation } from "./services"

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
            preference: [Preferences]
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
        createProfile(input: ProfileInput!): Profile
        updateProfile(id: ID!, input: ProfileInput!): Boolean
        createAccount(input: AccountInput!): Account
        updateAccount(id: ID!, input: AccountInput!): Boolean
        activateSimulationAccount(profile: ID!): String
    `,

    resolvers: {
        createProfile: ({ input }: any) => {
            // return createProfile(input)
        },
        
        updateProfile: ({ id, input }: any) => {
            // return createProfile(userAccount)
        },
        
        createAccount: ({ input }: any) => {
            // return createProfile(input)
        },

        updateAccount: ({ id, input }: any) => {
            // return updateAccount(id, input)
        },

        activateSimulationAccount: ({ profile }: any) => {
            return activateSimulation(profile)
        }
    }
}

export default entry