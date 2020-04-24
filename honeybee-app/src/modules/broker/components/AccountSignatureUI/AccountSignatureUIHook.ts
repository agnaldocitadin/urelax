import { API, BrokerAccountExtraData } from "honeybee-api"
import { Keyboard } from "react-native"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedCallback, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { useWizardHook } from "../../../../hooks/Wizard.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { showAPIError, showConfirm, showSuccess } from "../../../message"
import { updateSelectedExtraData } from "../../actions"
import { BROKER_FLOW_VIEW } from "../../constants"

export const useAccountSignatureUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const { _id, extraData } = useSelector((state: States) => state.BROKER.accountToUpdate)
    const isEditing = useSelector((state: States) => state.BROKER.isEditing || false)
    const flow = navigation.getParam(BROKER_FLOW_VIEW)

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_msg"), ()=> navigation.navigate(Routes.AccountListUI)))
    })
    
    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        navigation,
        currentView: Routes.AccountSignatureUI,
        flow,
        isEditing,
        onRequestEdit: async () => {
            Keyboard.dismiss()
            let changes = { signature: selectedValue } as BrokerAccountExtraData
            await API.updateBrokerAccount(_id, { extraData: changes })
            dispatch(showSuccess(ts("broker_account_update_success"), ts("broker_account_update_signature")))
            dispatch(updateSelectedExtraData(changes))
        },
        onRequestPersist: () => dispatch(updateSelectedExtraData({ signature: selectedValue })),
        onRequestFail: error => dispatch(showAPIError(error))
    })
    
    useEffectWhenReady(() => handleValueChanges(extraData?.signature))

    return {
        selectedValue,
        formTitle: isEditing ? ts("update_broker_account") : ts("add_broker_account"),
        btnLabel: isEditing ? ts("save_changes") : ts("next"),
        validForm: selectedValue && (<any>selectedValue).length >= 3,
        handleButtonPress,
        handleValueChanges,
        handleClose: !isEditing ? handleClose : undefined
    }
}