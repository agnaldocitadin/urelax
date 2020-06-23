import { StockTracker } from "honeybee-api"
import { useDispatch } from "react-redux"
import { animatedCallback } from "../../../core/Commons.hook"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useStockTrackerReviewUIHook = () => {

    const dispatch = useDispatch()
    // const { stockTrackerToUpdate, isEditing } = useSelector((state: States) => state.STOCK_TRACKER)
    // const simulation = useSelector((state: States) => state.SIGNIN.authenticatedUser.simulation || false)
    // const flow = getStockTrackerRoutes(simulation, isEditing)

    const handleClose = animatedCallback(() => {
        // dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_stock_tracker"), ()=> navigation.navigate(flow[0])))
    })

    const handleSaveStockTracker = animatedCallback(async () => {
        // try {
        //     let newStocktracker = await createStockTracker(stockTrackerToUpdate)
        //     dispatch(appendStockTrackers([newStocktracker], "begin"))
        //     dispatch(showSuccess(ts("stock_tracker_add_success"), ts("stock_tracker_add_success_msg")))
        //     // TODO Add stock tracker creation activiy to dashboard
        //     navigation.navigate(flow[0])
        // }
        // catch(e) {
        //     dispatch(showAPIError(e))
        // }
    }, []) //stockTrackerToUpdate

    return {
        stockTracker: {} as StockTracker, //stockTrackerToUpdate,
        handleSaveStockTracker,
        handleClose,
    }
}