import { BrokerAccount } from "honeybee-api"
import { useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedCallback, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { useWizardHook } from "../../../../hooks/Wizard.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { fetchBrokerAccountByUserQuery } from "../../../broker"
import { showConfirm, showError } from "../../../message"
import { updateSelectedStockTracker } from "../../actions"
import { getStockTrackerRoutes } from "../../reducer"

export const useStockTrackerBrokerUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ brokerAccounts, setBrokerAccounts ] = useState([] as BrokerAccount[])
    const [ fail, setFail] = useState(false)
    const isEditing = useSelector((state: States) => state.STOCK_TRACKER.isEditing)
    const userAccount = useSelector((state: States) => state.SIGNIN.authenticatedUser)
    const flow = getStockTrackerRoutes(userAccount.simulation || false, isEditing)

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        navigation,
        currentView: Routes.StockTrackerBrokerUI,
        flow,
        isEditing,
        onRequestEdit: () => {},
        onRequestPersist: () => dispatch(updateSelectedStockTracker({ brokerAccount: selectedValue })),
        onRequestFail: (error) => dispatch(showError(JSON.stringify(error.message)))
    })

    useEffectWhenReady(async () => {
        try {
            let brokerAccounts = await fetchBrokerAccountByUserQuery(userAccount._id)
            setBrokerAccounts(brokerAccounts)
            if (brokerAccounts.length === 0) {
                navigation.navigate(Routes.StockTrackerListUI)
                dispatch(showConfirm(ts("stock_tracker_no_account"), ts("stock_tracker_no_account_msg"), () => {
                    navigation.navigate(Routes.AccountListUI)
                }))
            }
        }
        catch(error) {
            setFail(true)
        }
    })

    return {
        fail,
        brokerAccounts,
        selectedValue,
        btnLabel: isEditing ? ts("save_changes") : ts("next"),
        formTitle: isEditing ? ts("update_stock_tracker") : ts("add_stock_tracker"),
        validForm: selectedValue,
        handleButtonPress,
        handleValueChanges,
        handleClose: !isEditing ? handleClose : undefined
    }
}