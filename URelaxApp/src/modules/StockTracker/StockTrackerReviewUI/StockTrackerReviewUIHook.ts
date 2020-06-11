import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedCallback } from "../../../../hooks/Commons.hook"
import { States } from "../../../../reducers/Reducer"
import { showAPIError, showConfirm, showSuccess } from "../../../message"
import { appendStockTrackers } from "../../actions"
import { createStockTracker } from "../../api"
import { getStockTrackerRoutes } from "../../reducer"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useStockTrackerReviewUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const { stockTrackerToUpdate, isEditing } = useSelector((state: States) => state.STOCK_TRACKER)
    const simulation = useSelector((state: States) => state.SIGNIN.authenticatedUser.simulation || false)
    const flow = getStockTrackerRoutes(simulation, isEditing)

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const handleSaveStockTracker = animatedCallback(async () => {
        try {
            let newStocktracker = await createStockTracker(stockTrackerToUpdate)
            dispatch(appendStockTrackers([newStocktracker], "begin"))
            dispatch(showSuccess(ts("stock_tracker_add_success"), ts("stock_tracker_add_success_msg")))
            // TODO Add stock tracker creation activiy to dashboard
            navigation.navigate(flow[0])
        }
        catch(e) {
            dispatch(showAPIError(e))
        }
    }, [stockTrackerToUpdate])

    return {
        stockTracker: stockTrackerToUpdate,
        handleSaveStockTracker,
        handleClose,
    }
}