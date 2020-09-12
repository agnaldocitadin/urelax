import { API, StockTracker, StockTrackerStatus } from 'urelax-api'
import * as StockTracker2 from ".."
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { Icons } from '../../../theming'
import InvestimentModule from '../../InvestimentModule'
import Messaging from "../../MessagingModule"
import { isDisabled } from "../StockTrackerControlButton"

export const useStockTrackerSettingUIHook = () => {

    const { showConfirm, showAPIError, showSuccess, showCustomMessage } = Messaging.actions()
    const { removeAppliedInvestiment } = InvestimentModule.actions()
    const { updateSelectedStockTracker } = StockTracker2.default.actions()
    const stockTracker: StockTracker = StockTracker2.default.select("selectedStockTracker")

    const handleDestroyStockTracker = animatedCallback(() => {

        showConfirm(ts("destroy_stock_tracker"), ts("destroy_stock_tracker_msg"), async () => {
            try {
                let result = await API.StockTracker.destroyStockTracker(stockTracker._id || "")
                updateSelectedStockTracker({ status: result.status } as StockTracker)
                
                if (result.status === StockTrackerStatus.DESTROYED) {
                    showSuccess(ts("stock_tracker_destroyed"), ts("stock_tracker_destroyed_msg"))
                    removeAppliedInvestiment(stockTracker._id)
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