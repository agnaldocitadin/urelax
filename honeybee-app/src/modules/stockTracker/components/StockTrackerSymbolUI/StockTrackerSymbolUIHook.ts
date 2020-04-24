import { Stock } from "honeybee-api"
import { useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedCallback, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { useWizardHook } from "../../../../hooks/Wizard.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { showAPIError, showConfirm } from "../../../message"
import { updateSelectedStockTracker } from "../../actions"
import { fetchAvailableSymbols } from "../../api"
import { getStockTrackerRoutes } from "../../reducer"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useStockTrackerSymbolUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ stocks, setStocks] = useState([] as Stock[])
    const [ fail, setFail] = useState(false)
    const isEditing = useSelector((state: States) => state.STOCK_TRACKER.isEditing)
    const simulation = useSelector((state: States) => state.SIGNIN.authenticatedUser.simulation || false)
    const flow = getStockTrackerRoutes(simulation, isEditing)
    
    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const { selectedValue, handleButtonPress, handleValueChanges } = useWizardHook({
        navigation,
        currentView: Routes.StockTrackerSymbolUI,
        flow,
        isEditing,
        onRequestEdit: () => {},
        onRequestPersist: () => dispatch(updateSelectedStockTracker({ stock: selectedValue })),
        onRequestFail: (error) => dispatch(showAPIError(error))
    })

    useEffectWhenReady(async () => {
        try {
            let symbols = await fetchAvailableSymbols()
            setStocks(symbols)
        }
        catch(error) {
            setFail(true)
        }
    })

    return {
        stocks,
        selectedValue,
        formTitle: isEditing ? ts("update_stock_tracker") : ts("add_stock_tracker"),
        btnLabel: isEditing ? ts("save_changes") : ts("next"),
        validForm: selectedValue,
        fail,
        handleButtonPress,
        handleValueChanges,
        handleClose: !isEditing ? handleClose : undefined
    }
}