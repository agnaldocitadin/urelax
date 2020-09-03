import { API, BrokerAccountInput } from "honeybee-api"

const fragment = `
    _id
    account {
        _id
    }
    accountName
    brokerCode
    simulation
    createdAt
    extraData {
        signature
        cpf
        password
        birthdate
    }
`

export const fetchBrokerAccountsByAccount = (account?: string) => {
    return API.Broker.fetchBrokerAccounts({ account }, fragment)
}

export const createBrokerAccount = (input: BrokerAccountInput) => {
    return API.Broker.createBrokerAccount(input, fragment)
}

export const updateBrokerAccount = (id: string, input: BrokerAccountInput) => {
    return API.Broker.updateBrokerAccount(id, input)
}

export const fetchBrokers = () => {
    return API.Broker.fetchBrokers({ active: true }, `
        code
        name
        logo
    `)
}