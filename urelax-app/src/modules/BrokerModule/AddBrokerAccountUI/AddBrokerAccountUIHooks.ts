import { useNavigation } from "@react-navigation/native"
import { Broker, Brokers } from 'urelax-api'
import { useCallback, useState } from "react"
import BrokerModule from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { Routes } from "../../NavigationModule/const"
import { fetchBrokers } from "../api"
import { useBroker } from "../hook"

export const useAddBrokerAccountUIHook = () => {

    const navigation = useNavigation()
    const { initBrokerAccount } = useBroker()
    const { selectBrokerAccount } = BrokerModule.actions()
    const [ brokers, setBrokers ] = useState<Broker[]>([])
    const [ loading, setLoading ] = useState(true)
    const [ fail, setFail ] = useState(false)
    
    const handleAddClearAccount = useCallback(() => {
        const account = initBrokerAccount(Brokers.CLEAR)
        selectBrokerAccount(account)
        navigation.navigate(Routes.BROKER_ACCOUNT_WIZARD)
    }, [])

    useEffectWhenReady(async () => {
        try {
            const brokers = await fetchBrokers()
            setBrokers(brokers)
            setLoading(false)
        }
        catch(error) {
            setFail(true)
        }
    })

    return {
        brokers,
        loading,
        fail,
        handleAddClearAccount
    }
}