import { Account } from 'urelax-api'
import { FC, useEffect } from "react"
import BrokerModule from ".."
import IdentityModule from "../../IdentityModule"
import { fetchBrokerAccountsByAccount } from "../api"

export const BrokerStartup: FC = () => {
    const account: Account = IdentityModule.select("activeAccount")
    const { setUserBrokerAccounts } = BrokerModule.actions()
    useEffect(() => {
        if (account?._id) {
            fetchBrokerAccountsByAccount(account?._id).then(brokerAccounts => setUserBrokerAccounts(brokerAccounts))
        }    
    }, [account?._id])
    return null
}