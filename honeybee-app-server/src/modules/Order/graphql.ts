
export const types = `
    type Execution {
        priceExecuted: Float
        quantityExecuted: Float
    }

    type StockOrderInfo {
        symbol: String
        type: String
        expiresAt: Datetime
    }

    type Order {
        _id: ID!
        account: Account
        progress: Float
        status: String
        orderBrokerId: String
        price: Float
        quantity: Float
        platform: String
        side: String
        message: String
        executions: [Execution]
        stock: StockOrderInfo
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
