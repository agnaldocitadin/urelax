import { ActivityType } from "honeybee-api"
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
        fetchActivities: (options: {
                id: string
                accountID: string
                ref: string
                activityType: ActivityType
                date: string
                page: number
                qty: number 
            }) => {
            return findActivitiesBy({ ...options, translate: true })
        }
    }

}

export default entry