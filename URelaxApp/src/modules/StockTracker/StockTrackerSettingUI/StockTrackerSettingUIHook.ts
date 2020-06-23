import { StockTracker } from "honeybee-api"
import { useDispatch } from "react-redux"
import { animatedCallback } from "../../../core/Commons.hook"
import { isDisabled } from "../StockTrackerControlButton"

export const useStockTrackerSettingUIHook = () => {

    const dispatch = useDispatch()
    const stockTracker = {} as StockTracker //useSelector((state: States) => state.STOCK_TRACKER.stockTrackerToUpdate)

    const handleDestroyStockTracker = animatedCallback(() => {
        // dispatch(showConfirm(ts("destroy_stock_tracker"), ts("destroy_stock_tracker_msg"), async () => {
        //     try {
        //         let result = await API.StockTracker.destroyStockTracker(stockTracker._id || "")
        //         dispatch(updateMainStockTracker({ status: result.status }))
                
        //         if (result.status === StockTrackerStatus.DESTROYED) {
        //             dispatch(removeStockTrackers(stockTracker._id || ""))
        //             dispatch(showSuccess(ts("stock_tracker_destroyed"), ts("stock_tracker_destroyed_msg")))
        //             // navigation.navigate(Routes.StockTrackerListUI)
        //         }
        //         else {
        //             dispatch(showCustomMessage({
        //                 title: ts("stock_tracker_wait_destroyed"),
        //                 message: ts("stock_tracker_wait_destroyed_msg"),
        //                 icon: Icons.CLOCK
        //             }))
        //             // navigation.navigate(Routes.StockTrackerPreviewUI)
        //         }
                
        //     }
        //     catch(error) {
        //         console.log(error)
        //     }
        // }, false))
    })

    return {
        stockTracker,
        showDestroyBtn: !isDisabled(stockTracker.status),
        handleDestroyStockTracker
    }
}