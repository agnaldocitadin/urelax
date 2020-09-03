import { Account, BrokerAccount } from 'urelax-api'
import BrokerModule from ".."
import IdentityModule from "../../IdentityModule"

export const useBrokerAccountDetailUIHook = () => {
    
    const activeAccount: Account = IdentityModule.select("activeAccount")
    const account: BrokerAccount = BrokerModule.select("selectedBrokerAccount")

    return {
        account,
        simulation: activeAccount.simulation
    }
}