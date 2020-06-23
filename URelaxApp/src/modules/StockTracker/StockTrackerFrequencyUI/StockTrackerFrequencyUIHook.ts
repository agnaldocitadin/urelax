import { useState } from "react"
import { useDispatch } from "react-redux"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { useWizardHook } from "../../../core/Wizard.hook"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useStockTrackerFrequencyUIHook = () => {

    const dispatch = useDispatch()
    const [ frequencies, setFrequencies] = useState([])
    const [ fail, setFail] = useState(false)
    // const { _id, frequency } = useSelector((state: States) => state.STOCK_TRACKER.stockTrackerToUpdate)
    const isEditing = false //useSelector((state: States) => state.STOCK_TRACKER.isEditing)
    // const simulation = useSelector((state: States) => state.SIGNIN.authenticatedUser.simulation || false)
    // const flow = getStockTrackerRoutes(simulation, isEditing)

    const handleClose = animatedCallback(() => {
        // dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        // navigation,
        // currentView: Routes.StockTrackerFrequencyUI,
        // flow,
        // isEditing,
        // onRequestEdit: async () => {
        //     Keyboard.dismiss()
        //     let changes = { frequency: selectedValue } as StockTracker
        //     await API.updateStockTracker(_id, changes)
        //     dispatch(updateSelectedStockTracker(changes))
        //     dispatch(showSuccess(ts("stock_tracker_update_success"), ts("stock_tracker_update_success_msg")))
        // },
        // onRequestPersist: () => dispatch(updateSelectedStockTracker({ frequency: selectedValue })),
        // onRequestFail: (error) => dispatch(showAPIError(error))
    })

    useEffectWhenReady(async () => {
        // try {
        //     handleValueChanges(frequency)
        //     let availableFrequencies = await fetchAvailableFrequencies()
        //     setFrequencies(availableFrequencies)
        // }
        // catch(error) {
        //     setFail(true)
        // }
    })

    return {
        selectedValue,
        frequencies,
        formTitle: isEditing ? ts("update_stock_tracker") : ts("add_stock_tracker"),
        btnLabel: isEditing ? ts("save_changes") : ts("next"),
        validForm: selectedValue,
        fail,
        handleButtonPress,
        handleValueChanges,
        handleClose: !isEditing ? handleClose : undefined
    }
}