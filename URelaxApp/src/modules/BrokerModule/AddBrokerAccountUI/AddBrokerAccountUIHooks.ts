import { useNavigation } from "@react-navigation/native"
import { Brokers } from "honeybee-api"
import { useCallback } from "react"
import BrokerModule from ".."
import { Routes } from "../../NavigationModule/const"
import { useBroker } from "../hook"

export const useAddBrokerAccountUIHook = () => {

    const navigation = useNavigation()
    const { initBrokerAccount } = useBroker()
    const { selectBrokerAccount } = BrokerModule.actions()

    const handleAddClearAccount = useCallback(() => {
        const account = initBrokerAccount(Brokers.CLEAR)
        selectBrokerAccount(account)
        navigation.navigate(Routes.BROKER_ACCOUNT_WIZARD)
    }, [])

    return {
        handleAddClearAccount
    }
}