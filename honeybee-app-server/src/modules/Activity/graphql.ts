import { GraphQLModule } from "../GraphQL"
import { findActivitiesBy } from "./services"

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
    queries: `
        fetchActivities(id: ID, accountID: ID, ref: ID, activityType: String, date: String, page: Int, qty: Int): [Activity]
    `,
    resolvers: {
        fetchActivities: ({ id, accountID, ref, activityType, date, page, qty }: any) => {
            return findActivitiesBy({ id, accountID, ref, activityType, date, page, qty })
            // return opa({ id, accountID, ref, activityType, date, page, qty })
        }
    }

}

export default entry