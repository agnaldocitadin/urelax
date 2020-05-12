
export const types = `
    

    type Preferences {
        receiveTradeNotification: Boolean
        receiveBalanceNotification: Boolean
        addStockTrackerPaused: Boolean
    }

    type Broker {
        _id: ID!
        code: String
        name: String
        logo: String
        active: Boolean
    }

    type Stock {
        _id: ID!
        symbol: String!
        description: String
        active: Boolean
        stockLot: Int
    }

    type StockTracker {
        _id: ID!
        userAccount: UserAccount
        brokerAccount: BrokerAccount
        stock: Stock
        strategy: Strategy
        status: String
        frequency: Frequency
        stockAmountLimit: Float
        autoAmountLimit: Boolean
        createdAt: Datetime
    }

    type Strategy {
        _id: String!
        description: String
        file: String
        impl: String
    }

    type Frequency {
        _id: String!
        description: String
    }

    type BrokerAccount {
        _id: String
        userAccount: UserAccount
        accountName: String
        brokerCode: String
        extraData: BrokerAccountExtraData
        createdAt: Datetime
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

    type ActivityDetail {
        title: String
        description: String
        hidden: Boolean
    }

    type Activity {
        _id: String
        userAccount: UserAccount
        activityType: String
        ref: String
        icon: String
        dateTime: Datetime
        title: String
        details: [ActivityDetail]
    }

    type StockSheet {
        symbol: String
        qty: Int
        averagePrice: Float
        lastAvailablePrice: Float
    }

    type BalanceSheet {
        _id: String
        userAccount: UserAccount
        brokerAccount: BrokerAccount
        createdAt: Datetime
        initialAmount: Float
        currentAmount: Float
        stocks: [StockSheet]
    }

    type BalanceSheetSummary {
        amount: Float
        amountVariation: Float
        credits: Float
        creditVariation: Float
        stocks: Float
        stockVariation: Float
    }

    type BalanceSheetHistory {
        _id: String
        date: Datetime
        userAccount: UserAccount
        brokerAccount: BrokerAccount
        currentAmount: Float
        stocks: [StockSheet]
    }

    type BalanceSheetHistorySummary {
        label: String!
        profit: Float
        amount: Float
        amountVariation: Float
        credits: Float
        creditVariation: Float
        stocks: Float
        stockVariation: Float
    }
    
`