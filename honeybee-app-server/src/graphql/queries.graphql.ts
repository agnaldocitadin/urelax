
export const queries = `
    type Query {
        
        fetchAvailableSymbols: [Stock]

        fetchActiveBrokers: [Broker]
        
        fetchBrokerByCode(brokerCode: String!): Broker
        
        fetchAvailableStrategies: [Strategy]
        
        fetchAvailableFrequencies: [Frequency]
        
        fetchUserAccountQuery(userAccountId: ID!): UserAccount
        
        fetchActiveStockTrackersQuery(userAccountId: ID!): [StockTracker]

        

        fetchBrokerAccountQuery(brokerAccountId: ID!): BrokerAccount
        
        fetchBrokerAccountByUserQuery(userAccountId: ID!): [BrokerAccount]

        fetchBalanceSheet(userAccountId: ID!, brokerAccountId: ID): [BalanceSheet]

        fetchBalanceSheetByUserQuery(userAccountId: ID!): BalanceSheetSummary

        fetchBalanceSheetHistoriesByUserQuery(userAccountId: ID!, date: String! page: Int!, qty: Int!, groupBy: String!): [BalanceSheetHistorySummary]
        
    }
`