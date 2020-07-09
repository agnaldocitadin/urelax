import { API } from "honeybee-api"

export const fetchBrokerAccountsByAccount = (account?: string) => {
    return API.Broker.fetchBrokerAccounts({ account }, `
        _id
        account {
            _id
        }
        accountName
        brokerCode
        simulation
    `)
}