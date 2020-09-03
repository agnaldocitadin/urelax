import { ActivityType } from 'urelax-api'
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
        fetchActivities(id: ID, accounts: [ID], ref: ID, activityType: String, date: String, page: Int, qty: Int): [Activity]
    `,
    resolvers: {
        fetchActivities: (options: {
                id?: string
                accounts?: string[]
                ref?: string 
                activityType?: ActivityType
                date?: string
                page?: number
                qty?: number
            }) => {
            return findActivitiesBy({ ...options, translate: true })
        }
    }

}

export default entry