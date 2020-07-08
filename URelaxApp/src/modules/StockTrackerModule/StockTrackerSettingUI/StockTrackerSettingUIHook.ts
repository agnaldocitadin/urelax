import { useNavigation } from "@react-navigation/native"
import { API, StockTracker, StockTrackerStatus } from "honeybee-api"
import * as StockTracker2 from ".."
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { Icons } from "../../../theming"
import Messaging from "../../Messaging"
import { isDisabled } from "../StockTrackerControlButton"

export const useStockTrackerSettingUIHook = () => {

    const navigation = useNavigation()
    const { showConfirm, showAPIError, showSuccess, showCustomMessage } = Messaging.actions()
    const { updateSelectedStockTracker } = StockTracker2.default.actions()
    const stockTracker: StockTracker = StockTracker2.default.select("selectedStockTracker")

    const handleDestroyStockTracker = animatedCallback(() => {

        showConfirm(ts("destroy_stock_tracker"), ts("destroy_stock_tracker_msg"), async () => {
            try {
                let result = await API.StockTracker.destroyStockTracker(stockTracker._id||"")
                updateSelectedStockTracker({ status: result.status } as StockTracker)
                
                if (result.status === StockTrackerStatus.DESTROYED) {
                    showSuccess(ts("stock_tracker_destroyed"), ts("stock_tracker_destroyed_msg"))
                }
                else {
                    showCustomMessage({
                        title: ts("stock_tracker_wait_destroyed"),
                        message: ts("stock_tracker_wait_destroyed_msg"),
                        icon: Icons.CLOCK
                    })
                }
            }
            catch(error) {
                showAPIError(error)
            }
        }, false)
    }, [stockTracker._id])

    return {
        stockTracker,
        showDestroyBtn: !isDisabled(stockTracker.status) && stockTracker.status !== StockTrackerStatus.DESTROYED,
        handleDestroyStockTracker
    }
}