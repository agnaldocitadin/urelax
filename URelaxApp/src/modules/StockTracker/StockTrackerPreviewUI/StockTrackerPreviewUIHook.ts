import { Activity, Transaction, StockTracker } from "honeybee-api"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"

export const useStockTrackerPreviewUIHook = () => {

    const dispatch = useDispatch()
    const [ fail, setFail] = useState(false)
    // const stockTracker = useSelector((state: States) => state.STOCK_TRACKER.selectedStockTracker || {})
    // const { selectedStockTrackerActivities, balanceSheet } = useSelector((state: States) => state.STOCK_TRACKER)

    const findStockBalance = useCallback(() => {
        // if (balanceSheet) {
        //     let stock = balanceSheet[0]?.stocks.find(stock => stock.symbol === stockTracker?.stock?.symbol)
            
        //     if (stock) {
        //         return {
        //             amount: ((stock?.lastAvailablePrice || 0) * stock?.qty),
        //             averagePrice: stock.averagePrice || 0,
        //             quantity: stock.qty
        //         }
        //     }
        // }

        return {
            amount: 0,
            averagePrice: 0,
            quantity: 0
        }

    }, [])
    
    const handleSettings = animatedCallback(() => {
        // dispatch(selectStockTrackerToUpdate(stockTracker))
        // navigation.navigate(Routes.StockTrackerSettingUI)
    }, [])
    
    const handleSelectActivity = animatedCallback((activity: Activity) => {
        // dispatch(selectActivity(activity))
        // navigation.navigate(Routes.ActivityDetailUI)
    })
    
    const handleStockTrackerAction = animatedCallback(async () => {
        try {
            let result
            // switch(stockTracker.status) {
            //     case(StockTrackerStatus.RUNNING):
            //         result = await API.StockTracker.pauseStockTracker(stockTracker._id || "")
            //         break
    
            //     case(StockTrackerStatus.PAUSED):
            //         result = await API.StockTracker.playStockTracker(stockTracker._id || "")
            //         break
            // }
            
            // let lastActivity = await fetchStockTrackerActivitiesQuery(stockTracker._id || "", 0, 1)
            // dispatch(updateMainStockTracker({ status: result?.status }))
            // dispatch(appendStockTrackerActivities(lastActivity, "begin"))
            // dispatch(setLastActivityOnDashboard(lastActivity[0]))
        }
        catch(error) {
            // dispatch(showAPIError(error))
        }
    }, [])

    const handleRefresh = animatedCallback(async () => {
        try {
            // let activities = await fetchStockTrackerActivitiesQuery(stockTracker?._id || "", 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            // dispatch(appendStockTrackerActivities(activities, "end", true))
        }
        catch(error) {
            // dispatch(showAPIError(error))
        }
    })

    const handleLoadMoreData = animatedCallback(async (page: number) => {
        try {
            // return await fetchStockTrackerActivitiesQuery(stockTracker?._id || "", page, AppConfig.QTY_INITIAL_ACTIVITIES)
            return Promise.resolve([] as Transaction[])
        }
        catch(error) {
            // dispatch(showAPIError(error))
            return Promise.reject()
        }
    })

    useEffectWhenReady(async () => {
        try {
            // let activities = await fetchStockTrackerActivitiesQuery(stockTracker?._id || "", 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            // dispatch(appendStockTrackerActivities(activities, "begin", true))
        }
        catch(error) {
            setFail(true)
        }
    }, 
    // () => dispatch(clearStockTrackerPreview())
    )

    return {
        stockTracker: {} as StockTracker,
        amount: 0,
        transactions: [] as Transaction[], //selectedStockTrackerActivities,
        fail,
        handleStockTrackerAction,
        handleSettings,
        handleSelectActivity,
        handleRefresh,
        handleLoadMoreData
    }
}