
export const types = `
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
`

export const inputs = `

`

export const queries = `

`

export const mutations = `

`

export const resolvers = {
    
}
