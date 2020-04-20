
export const inputs = `
    input UserAccountInput {
        name: String
        nickname: String
        passwd: String
        email: String
        active: Boolean
        deviceToken: String
        preferences: PreferenceInput
    }

    input PreferenceInput {
        receiveTradeNotification: Boolean
        receiveBalanceNotification: Boolean
        addStockTrackerPaused: Boolean
    }

    input BeeInput {
        userAccount: String
        brokerAccount: String
        stock: String
        strategy: String
        status: String
        frequency: String
        stockAmountLimit: Float
        autoAmountLimit: Boolean
    }

    input BrokerAccountInput {
        userAccount: String
        accountName: String
        initialAmount: Float
        brokerCode: String
        extraData: BrokerAccountExtraDataInput
    }

    input BrokerAccountExtraDataInput {
        token: String
		signature: String
		platformUID: String
		sessionId: String
		cpf: String
		passwd: String
		birthdate: Datetime
    }

`