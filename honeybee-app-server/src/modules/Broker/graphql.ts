
export const types = `
    type StockInfo {
        symbol: String
        stockLot: Float
    }

    type Investiment {
        _id: ID
        type: String
        description: String
        active: Boolean
        logo: String
        stock: StockInfo
    }

    type Broker {
        _id?: mongoose.Types.ObjectId
        code!: string
        name!: string
        logo!: string
        active!: boolean
        investiments?: Investiment[]
        createdAt?: Date
        updatedAt?: Date
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
