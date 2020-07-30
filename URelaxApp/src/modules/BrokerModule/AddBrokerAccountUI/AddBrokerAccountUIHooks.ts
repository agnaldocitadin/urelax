import { useNavigation } from "@react-navigation/native"
import { Brokers } from "honeybee-api"
import { useCallback } from "react"
import BrokerModule from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { Routes } from "../../NavigationModule/const"
import { fetchBrokers } from "../api"
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

    const handleBrokerAccounts = useCallback(() => navigation.navigate(Routes.BROKER_ACCOUNTS), [])

    useEffectWhenReady(async () => {
        const brokers = await fetchBrokers()
        // TODO
    })

    return {
        handleAddClearAccount,
        handleBrokerAccounts
    }
}