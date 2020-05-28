import { GraphQLModule } from "../GraphQL"
import { StockTrackerModel } from "./models"
import { createNewStockTracker, runOnCreate, updateStockTrackerById } from "./services"
import { StockTrackerFactory, stockTrackerPlayground } from "./trackers"

const entry: GraphQLModule = {
    types: `
        type StockTracker {
            _id: ID!
            account: Account
            brokerAccount: BrokerAccount
            strategy: String
            strategySetting: StrategySetting
            status: String
            frequency: String
            lastFrequencyUpdate: Datetime
            stockInfo: StockInvestimentInfo
            createdAt: Datetime
            updatedAt: Datetime
        }

        type StrategySetting {
            stockAmountLimit: Float
            autoAmountLimit: Boolean
        }
    `,

    inputs: `
        input StockTrackerInput {
            account: String
            brokerAccount: String
            strategy: String
            strategySetting: StrategySettingInput
            status: String
            frequency: String
            stockInfo: StockInvestimentInfoInput
        }

        input StrategySettingInput {
            stockAmountLimit: Float
            autoAmountLimit: Boolean
        }
    `,

    queries: `
        fetchStockTrackers(id: ID, account: ID, status: String, frequency: String, page: Int!, qty: Int!): [StockTracker]
    `,

    mutations: `
        createStockTracker(input: StockTrackerInput!): StockTracker
        updateStockTracker(id: ID!, input: StockTrackerInput!): Boolean
    `,

    resolvers: {
        fetchStockTrackers: async ({ id, account }: any) => {
            return StockTrackerModel.find({})
        },

        createStockTracker: async ({ input }: any) => {
            const model = await createNewStockTracker(input)
            if (runOnCreate(model)) {
                let investor = StockTrackerFactory.create(model)
                stockTrackerPlayground.addInvestor(investor)
            }
            return model
        },
        
        updateStockTracker: async ({ id, input }: any) => {
            let stockTrackerDB = await updateStockTrackerById(id, input)
            stockTrackerPlayground.refreshInvestor(stockTrackerDB)
            return true
        }
    }
}

export default entry