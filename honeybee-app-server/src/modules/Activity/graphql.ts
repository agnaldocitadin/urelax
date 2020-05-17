import { GraphQLModule } from "../GraphQL"

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
        fetchActivities(id: ID, account: ID, ref: ID, activityType: String, date: String, page: Int!, qty: Int!): [Activity]
    `,
    resolvers: {
        fetchActivities: ({ account, ref, activityType, date, page, qty }: any) => {
            // TODO
        }
    }

}

export default entry