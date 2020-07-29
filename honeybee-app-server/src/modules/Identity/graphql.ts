import { GraphQLModule } from "../GraphQL"
import { updateProfile } from "./services"

const entry: GraphQLModule = {
    types: `
        type Profile {
            _id: ID!
            name: String
            nickname: String
            email: String
            password: String
            accounts: [Account]
            activeAccount: String
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
        createProfile(profile: ProfileInput!): Profile
        updateProfile(id: ID!, input: ProfileInput!): Boolean
        updateAccount(id: ID!, input: AccountInput!): Boolean
    `,

    resolvers: {
        createProfile: ({ profile }: any) => {

        },

        updateProfile: async ({ id, input }: any) => {
            await updateProfile(id, input)
            return true
        },
        
        updateAccount: ({ id, input }: any) => {
            // TODO
        }
    }
}

export default entry