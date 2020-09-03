import { Broker, Brokers } from 'urelax-api'
import { useState } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { useDispatch, useSelector } from 'react-redux'
import { ts } from '../../../../core/I18n'
import { animatedCallback, useEffectWhenReady } from '../../../../hooks/Commons.hook'
import { Routes } from '../../../../navigations/Navigator'
import { States } from '../../../../reducers/Reducer'
import { showConfirm } from '../../../message'
import { prepateBrokerAccountToCreate, updateSelectedBrokerAccount } from '../../actions'
import { fetchActiveBrokers } from '../../api'
import { BROKER_FLOW_VIEW } from '../../constants'
import { getRoutes } from '../../reducer'

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useAccountCompanyUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ brokers, setBrokers ] = useState([] as Broker[])
    const [ fail, setFail ] = useState(false)
    const brokerCode = useSelector((state: States) => state.BROKER.accountToUpdate.brokerCode)
    const user = useSelector((state: States) => state.SIGNIN.authenticatedUser)

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_msg"), ()=> navigation.navigate(Routes.AccountListUI)))
    })
    
    const handleOptionSelection = animatedCallback((option: Broker) => dispatch(updateSelectedBrokerAccount({ brokerCode: <Brokers>option.code })))

    const handleButtonPress = animatedCallback(() => {
        const flow = getRoutes(brokerCode)
        navigation.navigate(flow[1], { [BROKER_FLOW_VIEW]: flow })
    }, [brokerCode])
    
    useEffectWhenReady(async () => {
        try {
            dispatch(prepateBrokerAccountToCreate(user))
            let brokers = await fetchActiveBrokers()
            setBrokers(brokers)
        }
        catch(error) {
            setFail(true)
        }
    })

    return {
        brokers,
        brokerCode,
        validForm: brokerCode,
        fail,
        handleButtonPress,
        handleOptionSelection,
        handleClose
    }
}