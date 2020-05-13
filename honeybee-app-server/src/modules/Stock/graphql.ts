import { GraphQLModule } from "../GraphQL"

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
    `
    // mutations: `
    //     createStockTracker(stockTracker: StockTrackerInput!): StockTracker
    //     updateStockTracker(_id: ID!, stockTracker: StockTrackerInput!): Boolean
    // `
}

export default entry