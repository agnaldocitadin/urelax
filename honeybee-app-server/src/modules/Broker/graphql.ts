
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
        _id: ID!
        code: String
        name: String
        logo: String
        active: Boolean
        investiments: [Investiment]
        createdAt: Datetime
        updatedAt: Datetime
    }

    type BrokerAccountExtraData {
        token: String
        signature: String
        platformUID: String
        sessionId: String
        cpf: String
        passwd: String
        birthdate: Datetime
    }

    type BrokerAccount {
        _id: ID!
        account: Account
        accountName: String
        brokerCode: String
        extraData: BrokerAccountExtraData
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
