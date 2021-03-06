import { GraphQLModule } from "../GraphQL"
import { manageDevice, updateAccount, updateProfile } from "./services"

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
            devices: [Device]
            createdAt: Datetime
            updatedAt: Datetime
        }

        type Preferences {
            language: String
            receiveBuyNotification: Boolean
            receiveSellNotification: Boolean
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
            simulation: Boolean
            preference: PreferenceInput
        }

        input DeviceInput {
            deviceId: String!
            token: String!
            active: Boolean!
        }

        input PreferenceInput {
            language: String
            receiveBuyNotification: Boolean
            receiveSellNotification: Boolean
            receiveBalanceNotification: Boolean
            addStockTrackerPaused: Boolean
        }
    `,

    mutations: `
        updateProfile(id: ID!, input: ProfileInput!): Boolean
        updateAccount(id: ID!, input: AccountInput!): Boolean
        manageDevice(id: ID!, input: DeviceInput!): Boolean
    `,

    resolvers: {
        updateProfile: async ({ id, input }: any) => {
            await updateProfile(id, input)
            return true
        },
        
        updateAccount: async ({ id, input }: any) => {
            await updateAccount(id, input)
            return true
        },

        manageDevice: async ({ id, input}: any) => {
            await manageDevice(id, input)
            return true
        }
    }
}

export default entry