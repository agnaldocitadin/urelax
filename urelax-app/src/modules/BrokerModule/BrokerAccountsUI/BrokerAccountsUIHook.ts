import { useNavigation } from "@react-navigation/native"
import { Account, BrokerAccount } from 'urelax-api'
import BrokerModule from ".."
import { animatedCallback } from "../../../core/Commons.hook"
import IdentityModule from "../../IdentityModule"
import { Routes } from "../../NavigationModule/const"

export const useBrokerAccountsUIHook = () => {

    const navigation = useNavigation()
    const activeAccount: Account = IdentityModule.select("activeAccount")
    const accounts: BrokerAccount[] = BrokerModule.select("userBrokerAccounts")
    const { selectBrokerAccount } = BrokerModule.actions()

    const handleSelectBrokerAccount = animatedCallback((account: BrokerAccount) => {
        selectBrokerAccount(account)
        navigation.navigate(Routes.BROKER_ACCOUNT_DETAIL)
    })

    const handleAddBrokerAccount = animatedCallback(() => {
        navigation.navigate(Routes.ADD_BROKER_ACCOUNT)
    })

    return {
        accounts,
        simulation: activeAccount.simulation,
        handleSelectBrokerAccount,
        handleAddBrokerAccount,
    }
}