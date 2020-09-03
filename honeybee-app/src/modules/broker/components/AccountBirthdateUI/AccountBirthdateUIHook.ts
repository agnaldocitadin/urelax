import { API, BrokerAccountExtraData } from 'urelax-api'
import { Keyboard } from 'react-native'
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from '../../../../core/I18n'
import { animatedCallback, useEffectWhenReady } from '../../../../hooks/Commons.hook'
import { useWizardHook } from "../../../../hooks/Wizard.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from '../../../../reducers/Reducer'
import { showAPIError, showConfirm, showSuccess } from '../../../message'
import { updateSelectedExtraData } from '../../actions'
import { BROKER_FLOW_VIEW } from '../../constants'

export const useAccountBirthdateUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const { _id, extraData } = useSelector((state: States) => state.BROKER.accountToUpdate)
    const isEditing = useSelector((state: States) => state.BROKER.isEditing || false)
    const flow = navigation.getParam(BROKER_FLOW_VIEW)

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_msg"), ()=> navigation.navigate(Routes.AccountListUI)))
    })
    
    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        navigation,
        currentView: Routes.AccountBirthdateUI,
        flow,
        isEditing,
        onRequestEdit: async () => {
            Keyboard.dismiss()
            let changes = { birthdate: selectedValue } as BrokerAccountExtraData
            await API.updateBrokerAccount(_id, { extraData: changes })
            dispatch(updateSelectedExtraData(changes))
            dispatch(showSuccess(ts("broker_account_update_success"), ts("broker_account_update_birthdate")))
        },
        onRequestPersist: () => dispatch(updateSelectedExtraData({ birthdate: selectedValue })),
        onRequestFail: error => dispatch(showAPIError(error))
    })
    
    useEffectWhenReady(() => handleValueChanges(extraData?.birthdate))

    return {
        selectedValue,
        formTitle: isEditing ? ts("update_broker_account") : ts("add_broker_account"),
        btnLabel: isEditing ? ts("save_changes") : ts("next"),
        validForm: selectedValue,
        handleButtonPress,
        handleValueChanges,
        handleClose: !isEditing ? handleClose : undefined
    }
}