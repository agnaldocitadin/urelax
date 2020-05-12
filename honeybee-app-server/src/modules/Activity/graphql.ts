import { GraphQLModule } from "../GraphQL"
import { findActivitiesByAccount, findActivitiesByStockTracker } from "./services"

const entry: GraphQLModule = {
    types: `
        type Activity {
            _id: ID!
            account: [Account]
            activityType: String
            ref: String
            icon: String
            title: String
            details: [ActivityDetail]
            createdAt: Datetime
        }

        type ActivityDetail {
            title: String
            description: String
            hidden: Boolean
        }
    `,
    // queries: `
    //     fetchStockTrackerActivitiesQuery(stockTrackerId: ID!, date: String, page: Int!, qty: Int!): [Activity]
    //     fetchUserActivitiesQuery(userAccountId: ID!, date: String, page: Int!, qty: Int!): [Activity]
    // `,
    resolvers: {
        fetchStockTrackerActivitiesQuery: ({ stockTrackerId, date, page, qty }: any) => {
            return findActivitiesByStockTracker(stockTrackerId, page, qty)
        },
    
        fetchUserActivitiesQuery: ({ userAccountId, date, page, qty }: any) => {
            return findActivitiesByAccount(userAccountId, page, qty)
        }
    }

}

export default entry