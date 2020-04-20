
export const mutations = `
    type Mutation {

        createUserAccount(userAccount: UserAccountInput!): UserAccount
        
        createBee(bee: BeeInput!): Bee
        
        createBrokerAccount(brokerAccount: BrokerAccountInput!): BrokerAccount
        
        updateUserAccount(_id: ID!, userAccount: UserAccountInput!): Boolean

        updateUserPreferences(_id: ID!, preferences: PreferenceInput!): Boolean
        
        updateBrokerAccount(_id: ID!, brokerAccount: BrokerAccountInput!): Boolean
        
        updateBee(_id: ID!, bee: BeeInput!): Boolean

        activateSimulationAccount(userAccountId: ID!): String
    }
`