import { API, BrokerAccountInput } from "honeybee-api"

const fragment = `
    _id
    account {
        _id
    }
    accountName
    brokerCode
    simulation
`

export const fetchBrokerAccountsByAccount = (account?: string) => {
    return API.Broker.fetchBrokerAccounts({ account }, fragment)
}

export const createBrokerAccount = (input: BrokerAccountInput) => {
    return API.Broker.createBrokerAccount(input, fragment)
}