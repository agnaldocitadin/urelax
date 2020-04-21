import { BrokerAccount } from "honeybee-api"
import { useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { animatedCallback, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { appendBrokerAccounts, resetBrokerAccountModule, selectBrokerAccountToUpdate } from "../../actions"
import { fetchBrokerAccountByUserQuery } from "../../api"
import { BROKER_FLOW_VIEW } from "../../constants"
import { getRoutes } from "../../reducer"

export const useAccountListUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ loading, setLoading ] = useState(true)
    const [ fail, setFail ] = useState(false)
    const { _id } = useSelector((state: States) => state.SIGNIN.authenticatedUser)
    const brokerAccounts = useSelector((state: States) => state.BROKER.brokerAccounts)

    const handleAddBrokerAccount = animatedCallback(() => navigation.navigate(Routes.AccountCompanyUI))

    const handleEditAccount = animatedCallback((account: BrokerAccount) => {
        dispatch(selectBrokerAccountToUpdate(account))
        const flow = getRoutes(account.brokerCode)
        navigation.navigate(flow[0], { [BROKER_FLOW_VIEW]: flow })
    })

    useEffectWhenReady(async () => {
        try {
            const accounts = await fetchBrokerAccountByUserQuery(_id)
            dispatch(appendBrokerAccounts(accounts, true))
            setLoading(false)
        }
        catch(error) {
            setFail(true)
        }
    }, () => dispatch(resetBrokerAccountModule()))
    
    return {
        fail,
        loading,
        brokerAccounts,
        handleEditAccount,
        handleAddBrokerAccount
    }
}