import { GraphQLModule } from "../GraphQL"
import { activateSimulation, createProfile, updateAccount } from "./services"

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
            preference: [Preferences]
        }
    `,
    inputs: `
        input ProfileInput {
            name: String
            nickname: String
            email: String
            password: String
            accounts: [AccountInput]
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
    // mutations: `
    //     createProfile(userAccount: UserAccountInput!): UserAccount
    //     updateAccount(_id: ID!, userAccount: UserAccountInput!): Boolean
    //     activateSimulationAccount(userAccountId: ID!): String
    // `,
    resolvers: {
        createProfile: ({ userAccount }: any) => {
            return createProfile(userAccount)
        },
        updateAccount: ({ _id, userAccount }: any) => {
            return updateAccount(_id, userAccount)
        },
        activateSimulationAccount: ({ userAccountId }: any) => {
            return activateSimulation(userAccountId)
        }
    }
}

export default entry