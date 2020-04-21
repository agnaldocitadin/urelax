
export const mutations = `
    type Mutation {

        createUserAccount(userAccount: UserAccountInput!): UserAccount
        
        createStockTracker(stockTracker: StockTrackerInput!): StockTracker
        
        createBrokerAccount(brokerAccount: BrokerAccountInput!): BrokerAccount
        
        updateUserAccount(_id: ID!, userAccount: UserAccountInput!): Boolean

        updateUserPreferences(_id: ID!, preferences: PreferenceInput!): Boolean
        
        updateBrokerAccount(_id: ID!, brokerAccount: BrokerAccountInput!): Boolean
        
        updateStockTracker(_id: ID!, stockTracker: StockTrackerInput!): Boolean

        activateSimulationAccount(userAccountId: ID!): String
    }
`