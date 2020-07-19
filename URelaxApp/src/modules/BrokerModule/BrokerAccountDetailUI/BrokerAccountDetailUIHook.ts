import { BrokerAccount } from "honeybee-api"
import BrokerModule from ".."

export const useBrokerAccountDetailUIHook = () => {
    
    const account: BrokerAccount = BrokerModule.select("selectedBrokerAccount")

    return {
        account
    }
}