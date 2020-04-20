import { API, StockTrackerStatus } from "honeybee-api"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { removeStockTrackers, updateMainStockTracker } from "../.."
import { Icons } from "../../../../core/Theme"
import { ts } from "../../../../core/I18n"
import { animatedCallback } from "../../../../globals/Utils"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { showConfirm, showCustomMessage, showSuccess } from "../../../message"
import { isDisabled } from "../BeeControlButton"

export const useStockTrackerSettingUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const stockTracker = useSelector((state: States) => state.STOCK_TRACKER.stockTrackerToUpdate)

    const handleDestroyStockTracker = animatedCallback(() => {
        dispatch(showConfirm(ts("destroy_stock_tracker"), ts("destroy_stock_tracker_msg"), async () => {
            try {
                let result = await API.destroyStockTracker(stockTracker._id || "")
                dispatch(updateMainStockTracker({ status: result.status }))
                
                if (result.status === StockTrackerStatus.DESTROYED) {
                    dispatch(removeStockTrackers(stockTracker._id || ""))
                    dispatch(showSuccess(ts("stock_tracker_destroyed"), ts("stock_tracker_destroyed_msg")))
                    navigation.navigate(Routes.StockTrackerListUI)
                }
                else {
                    dispatch(showCustomMessage({
                        title: ts("stock_tracker_wait_destroyed"),
                        message: ts("stock_tracker_wait_destroyed_msg"),
                        icon: Icons.CLOCK
                    }))
                    navigation.navigate(Routes.StockTrackerPreviewUI)
                }
                
            }
            catch(error) {
                console.log(error)
            }
        }, false))
    })

    return {
        stockTracker,
        showDestroyBtn: !isDisabled(stockTracker.status),
        handleDestroyStockTracker
    }
}