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
    // const { birthdate, cpf, signature, passwd } = account.extraData || {}
    // const extra = `extraData:{
    //     ${birthdate ? `birthdate:"${birthdate}"` : ""}
    //     ${cpf ? `cpf:"${cpf}"` : ""}
    //     ${signature ? `signature:"${signature}"` : ""}
    //     ${passwd ? `passwd:"${passwd}"` : ""}
    // }`

    // const mutation = `
    //     mutation {
    //         updateBrokerAccount(_id:"${id}",brokerAccount:{
    //             ${account.accountName ? `accountName:"${account.accountName}"` : ""}
    //             ${extra}
    //         })
    //     }`

    // const json = await fetchGraphql(mutation).catch(error => {
    //     throw `UpdateBrokerAccount error -> ${error[0]}`
    // })

    // return json.data.updateBrokerAccount
}

export const createBrokerAccount = async (account: BrokerAccount): Promise<BrokerAccount> => {
    return API.createBrokerAccount(account, `
        _id
        accountName
        initialAmount
        brokerCode
        extraData {
            token
            signatures
            platformUID
            sessionId
            cpf
            passwd
            birthdate
        }
    `)
    // const { birthdate, cpf, signature, passwd } = account.extraData || {}
    // const extra = `extraData:{
    //     ${birthdate ? `birthdate:"${birthdate.toISOString()}"` : ""}
    //     ${cpf ? `cpf:"${cpf}"` : ""}
    //     ${signature ? `signature:"${signature}"` : ""}
    //     ${passwd ? `passwd:"${passwd}"` : ""}
    // }`

    // const mutation = `
    //     mutation {
    //         createBrokerAccount(brokerAccount:{
    //             ${account.userAccount ? `userAccount:"${account.userAccount._id}"` : ""}
    //             ${account.accountName ? `accountName:"${account.accountName}"` : ""}
    //             ${account.brokerCode ? `brokerCode:"${account.brokerCode}"` : ""}
    //             ${extra}
    //         }){
    //             _id
    //             accountName
    //             initialAmount
    //             brokerCode
    //             extraData {
    //                 token
    //                 signature
    //                 platformUID
    //                 sessionId
    //                 cpf
    //                 passwd
    //                 birthdate
    //             }
    //         }
    //     }
    // `

    // const json = await fetchGraphql(mutation).catch(error => {
    //     throw `CreateBrokerAccount error -> ${error[0]}`
    // })

    // return json.data.createBrokerAccount
}

