import { Frequency, StockTracker } from "honeybee-api"
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
import { fetchAvailableFrequencies, updateBee } from "../../api"
import { getStockTrackerRoutes } from "../../reducer"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useStockTrackerFrequencyUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ frequencies, setFrequencies] = useState([] as Frequency[])
    const [ fail, setFail] = useState(false)
    const { _id, frequency } = useSelector((state: States) => state.STOCK_TRACKER.stockTrackerToUpdate)
    const isEditing = useSelector((state: States) => state.STOCK_TRACKER.isEditing)
    const simulation = useSelector((state: States) => state.SIGNIN.authenticatedUser.simulation || false)
    const flow = getStockTrackerRoutes(simulation, isEditing)

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        navigation,
        currentView: Routes.StockTrackerFrequencyUI,
        flow,
        isEditing,
        onRequestEdit: async () => {
            Keyboard.dismiss()
            let changes = { frequency: selectedValue } as StockTracker
            await updateBee(_id, changes)
            dispatch(updateSelectedStockTracker(changes))
            dispatch(showSuccess(ts("stock_tracker_update_success"), ts("stock_tracker_update_success_msg")))
        },
        onRequestPersist: () => dispatch(updateSelectedStockTracker({ frequency: selectedValue })),
        onRequestFail: (error) => dispatch(showError(JSON.stringify(error.message)))
    })

    useEffectWhenReady(async () => {
        try {
            handleValueChanges(frequency)
            let availableFrequencies = await fetchAvailableFrequencies()
            setFrequencies(availableFrequencies)
        }
        catch(error) {
            setFail(true)
        }
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