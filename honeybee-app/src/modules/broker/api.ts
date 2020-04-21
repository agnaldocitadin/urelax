import { API, Broker, BrokerAccount } from "honeybee-api"

export const fetchBrokerAccountByUserQuery = async (userAccountId: string): Promise<BrokerAccount[]> => {
    return API.fetchBrokerAccountByUserQuery(userAccountId, `
        _id
        accountName
        initialAmount
        brokerCode
        extraData {
            token
            signature
            platformUID
            sessionId
            cpf
            passwd
            birthdate
        }
    `)
}

export const fetchActiveBrokers = async (): Promise<Broker[]> => {
    return API.fetchActiveBrokers(`
        _id
        code
        name
    `)
}


export const updateBrokerAccount = async (id: string = "", account: BrokerAccount) => {
    return API.updateBrokerAccount(id, account)
}

export const createBrokerAccount = async (account: BrokerAccount): Promise<BrokerAccount> => {
    return API.createBrokerAccount(account, `
        _id
        accountName
        initialAmount
        brokerCode
        extraData {
            token
            signature
            platformUID
            sessionId
            cpf
            passwd
            birthdate
        }
    `)
}

