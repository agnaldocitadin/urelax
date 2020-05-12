
export const types = `
    type Transaction {
        dateTime: Datetime
        type: String
        value: Float
    }

    type FinancialHistory {
        _id: ID!
        date: Datetime
        acount: Account
        transactions: [Transaction]
        locked: Boolean
        createdAt: Datetime
        updatedAt: Datetime
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
