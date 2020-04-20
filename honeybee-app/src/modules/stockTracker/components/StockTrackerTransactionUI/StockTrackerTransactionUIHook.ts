import { API, StockTracker } from "honeybee-api"
import { useState } from "react"
import { Keyboard } from "react-native"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedCallback, useEffectWhenReady } from "../../../../globals/Utils"
import { useWizardHook } from "../../../../hooks/Wizard.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { showConfirm, showError, showSuccess } from "../../../message"
import { updateSelectedStockTracker } from "../../actions"
import { getStockTrackerRoutes } from "../../reducer"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useStockTrackerTransactionUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const { _id, autoAmountLimit, stockAmountLimit } = useSelector((state: States) => state.STOCK_TRACKER.stockTrackerToUpdate)
    const isEditing = useSelector((state: States) => state.STOCK_TRACKER.isEditing)
    const simulation = useSelector((state: States) => state.SIGNIN.authenticatedUser.simulation || false)
    const flow = getStockTrackerRoutes(simulation, isEditing)
    const [ autoLimit, setAutoLimit ] = useState(autoAmountLimit)

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const handleAutoLimit = animatedCallback((active: boolean) => setAutoLimit(active))

    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        navigation,
        currentView: Routes.StockTrackerTransactionUI,
        flow,
        isEditing,
        onRequestEdit: async () => {
            Keyboard.dismiss()
            let changes = { stockAmountLimit: selectedValue, autoAmountLimit: autoLimit } as StockTracker
            await API.updateBee(_id, changes)
            dispatch(updateSelectedStockTracker(changes))
            dispatch(showSuccess(ts("stock_tracker_update_success"), ts("stock_tracker_update_success_msg")))
        },
        onRequestPersist: () => dispatch(updateSelectedStockTracker({ stockAmountLimit: selectedValue, autoAmountLimit: autoLimit })),
        onRequestFail: (error) => dispatch(showError(JSON.stringify(error)))
    }, [autoLimit, stockAmountLimit])

    useEffectWhenReady(() => handleValueChanges(stockAmountLimit))

    return {
        selectedValue: selectedValue || "0",
        autoLimit,
        formTitle: isEditing ? ts("update_stock_tracker") : ts("add_stock_tracker"),
        btnLabel: isEditing ? ts("save_changes") : ts("next"),
        validForm: selectedValue || 0 > 0 || autoLimit,
        handleButtonPress,
        handleValueChanges,
        handleAutoLimit,
        handleClose: !isEditing ? handleClose : undefined
    }
}