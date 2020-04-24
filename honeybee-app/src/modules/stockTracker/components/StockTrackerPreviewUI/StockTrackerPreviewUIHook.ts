import { Activity, API, StockTrackerStatus } from "honeybee-api"
import { useCallback, useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import AppConfig from "../../../../core/AppConfig"
import { animatedCallback, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { selectActivity } from "../../../activity"
import { setLastActivityOnDashboard } from "../../../dashboard"
import { showAPIError } from "../../../message"
import { appendStockTrackerActivities, clearStockTrackerPreview, initStockTrackerModule, selectStockTrackerToUpdate, updateMainStockTracker } from "../../actions"
import { fetchStockTrackerActivitiesQuery, fetchStockTrackerBalance } from "../../api"

export const useStockTrackerPreviewUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ fail, setFail] = useState(false)
    const stockTracker = useSelector((state: States) => state.STOCK_TRACKER.selectedStockTracker || {})
    const { selectedStockTrackerActivities, balanceSheet } = useSelector((state: States) => state.STOCK_TRACKER)
    const userAccountId = useSelector((state: States) => state.SIGNIN.authenticatedUser._id || "")

    const findStockBalance = useCallback(() => {
        let stock = balanceSheet?.stocks.find(stock => stock.symbol === stockTracker?.stock?.symbol)
        
        if (stock) {
            return {
                amount: (stock?.averagePrice * stock?.qty),
                averagePrice: stock.averagePrice,
                quantity: stock.qty
            }
        }

        return {
            amount: 0,
            averagePrice: 0,
            quantity: 0
        }

    }, [balanceSheet])
    
    const handleSettings = animatedCallback(() => {
        dispatch(selectStockTrackerToUpdate(stockTracker))
        navigation.navigate(Routes.StockTrackerSettingUI)
    }, [stockTracker])
    
    const handleSelectActivity = animatedCallback((activity: Activity) => {
        dispatch(selectActivity(activity))
        navigation.navigate(Routes.ActivityDetailUI)
    })
    
    const handleStockTrackerAction = animatedCallback(async () => {
        try {
            let result
            switch(stockTracker.status) {
                case(StockTrackerStatus.RUNNING):
                    result = await API.pauseStockTracker(stockTracker._id || "")
                    break
    
                case(StockTrackerStatus.PAUSED):
                    result = await API.playStockTracker(stockTracker._id || "")
                    break
            }
            
            let lastActivity = await fetchStockTrackerActivitiesQuery(stockTracker._id || "", 0, 1)
            dispatch(updateMainStockTracker({ status: result?.status }))
            dispatch(appendStockTrackerActivities(lastActivity, "begin"))
            dispatch(setLastActivityOnDashboard(lastActivity[0]))
        }
        catch(error) {
            dispatch(showAPIError(error))
        }
    }, [stockTracker])

    const handleRefresh = animatedCallback(async () => {
        try {
            let activities = await fetchStockTrackerActivitiesQuery(stockTracker?._id || "", 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            dispatch(appendStockTrackerActivities(activities, "end", true))
        }
        catch(error) {
            dispatch(showAPIError(error))
        }
    })

    const handleLoadMoreData = animatedCallback(async (page: number) => {
        try {
            return await fetchStockTrackerActivitiesQuery(stockTracker?._id || "", page, AppConfig.QTY_INITIAL_ACTIVITIES)
        }
        catch(error) {
            dispatch(showAPIError(error))
            return Promise.reject()
        }
    })

    useEffectWhenReady(async () => {
        try {
            let balance = await fetchStockTrackerBalance(userAccountId, stockTracker.brokerAccount?._id)
            let activities = await fetchStockTrackerActivitiesQuery(stockTracker?._id || "", 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            dispatch(initStockTrackerModule(balance[0], activities))
        }
        catch(error) {
            setFail(true)
        }
    }, () => dispatch(clearStockTrackerPreview()))

    return {
        stockTracker,
        activities: selectedStockTrackerActivities,
        stockBalance: findStockBalance(),
        fail,
        handleStockTrackerAction,
        handleSettings,
        handleSelectActivity,
        handleRefresh,
        handleLoadMoreData
    }
}