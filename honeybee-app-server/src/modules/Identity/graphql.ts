
export const types = `
    type Profile {
        _id: ID!
        name: String
        nickname: String
        email: String
        password: String
        accounts: [Account]
        active: Boolean
        createdAt: Datetime
        updatedAt: Datetime
    }

    type Preferences {
        language: String
        receiveTradeNotification: Boolean
        receiveBalanceNotification: Boolean
        addStockTrackerPaused: Boolean
    }

    type Device {
        deviceId: String
        token: String
        active: Boolean
    }

    type Account {
        _id: ID!
        active: Boolean
        simulation: Boolean
        devices: [Device]
        preference: [Preferences]
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
