import { useState } from "react"
import { useDispatch } from "react-redux"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { useWizardHook } from "../../../core/Wizard.hook"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useStockTrackerTransactionUIHook = () => {

    const dispatch = useDispatch()
    // const { _id, autoAmountLimit, stockAmountLimit } = useSelector((state: States) => state.STOCK_TRACKER.stockTrackerToUpdate)
    const isEditing = false//useSelector((state: States) => state.STOCK_TRACKER.isEditing)
    // const simulation = useSelector((state: States) => state.SIGNIN.authenticatedUser.simulation || false)
    // const flow = getStockTrackerRoutes(simulation, isEditing)
    const [ autoLimit, setAutoLimit ] = useState(false)//autoAmountLimit

    const handleClose = animatedCallback(() => {
        // dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const handleAutoLimit = animatedCallback((active: boolean) => setAutoLimit(active))

    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        // navigation,
        // currentView: Routes.StockTrackerTransactionUI,
        // flow,
        // isEditing,
        // onRequestEdit: async () => {
        //     Keyboard.dismiss()
        //     let changes = { stockAmountLimit: selectedValue, autoAmountLimit: autoLimit } as StockTracker
        //     await API.updateStockTracker(_id, changes)
        //     dispatch(updateSelectedStockTracker(changes))
        //     dispatch(showSuccess(ts("stock_tracker_update_success"), ts("stock_tracker_update_success_msg")))
        // },
        // onRequestPersist: () => dispatch(updateSelectedStockTracker({ stockAmountLimit: selectedValue, autoAmountLimit: autoLimit })),
        // onRequestFail: (error) => dispatch(showAPIError(error))
    }, [])//[autoLimit, stockAmountLimit])

    // useEffectWhenReady(() => handleValueChanges(stockAmountLimit))

    return {
        selectedValue: selectedValue || "0",
        autoLimit: false,
        formTitle: isEditing ? ts("update_stock_tracker") : ts("add_stock_tracker"),
        btnLabel: isEditing ? ts("save_changes") : ts("next"),
        validForm: selectedValue || 0 > 0 || autoLimit,
        handleButtonPress,
        handleValueChanges,
        handleAutoLimit,
        handleClose: !isEditing ? handleClose : undefined
    }
}