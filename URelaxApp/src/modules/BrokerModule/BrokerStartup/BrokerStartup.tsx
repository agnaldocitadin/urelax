import { Profile } from "honeybee-api"
import { FC, useEffect } from "react"
import BrokerModule from ".."
import Security from "../../Security"
import { fetchBrokerAccountsByAccount } from "../api"


export const BrokerStartup: FC = () => {
    const profile: Profile = Security.select("profile")
    const { setUserBrokerAccounts } = BrokerModule.actions()
    useEffect(() => {
        if (profile) {
            const account = profile.accounts.find(account => account._id === profile.activeAccount)
            fetchBrokerAccountsByAccount(account?._id).then(brokerAccounts => setUserBrokerAccounts(brokerAccounts))
        }    
    }, [profile])
    return null
}