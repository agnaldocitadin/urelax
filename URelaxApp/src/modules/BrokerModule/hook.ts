import { Account, BrokerAccount, BrokerAccountInput, Brokers } from 'urelax-api'
import { useCallback } from "react"
import IdentityModule from "../IdentityModule"

export const useBroker = () => {

    const account: Account = IdentityModule.select("activeAccount")
    
    const initBrokerAccount = useCallback((code: Brokers) => {
        return {
            account,
            brokerCode: code,
            extraData: {}
        } as BrokerAccount
    }, [account])

    const convertToBrokerAccountInput = useCallback((brokerAccount: BrokerAccount): BrokerAccountInput => {
        const { 
            account,
            accountName,
            brokerCode, 
            extraData 
        } = brokerAccount
        
        return {
            account: account._id,
            accountName: accountName,
            brokerCode: brokerCode,
            simulation: false,
            extraData: {...extraData}
        }
    }, [])

    return {
        initBrokerAccount,
        convertToBrokerAccountInput
    }
}