import { useNavigation } from "@react-navigation/native"
import { Activity, API, StockTracker, StockTrackerStatus } from "honeybee-api"
import { useCallback, useState } from "react"
import StockTrackerModule from ".."
import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import AppConfig from "../../../core/AppConfig"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import ActivityHistoryModule from "../../ActivityHistoryModule"
import { fetchActivities } from "../../ActivityHistoryModule/api"
import Messaging from "../../MessagingModule"
import { Routes } from "../../NavigationModule/const"
import { fetchStockTrackerByID } from "../api"

export const useStockTrackerPreviewUIHook = () => {

    const navigation = useNavigation()
    const [ loading, setLoading] = useState(true)
    const [ fail, setFail] = useState(false)
    const [ btnState, setBtnState ] = useState(InteractiveButtonStates.NORMAL)
    const { showAPIError } = Messaging.actions()
    const { selectActivity } = ActivityHistoryModule.actions()
    const { selectStockTracker, addStockTrackerStatements, addStockTrackerActivities, updateSelectedStockTracker } = StockTrackerModule.actions()
    const stockTrackerID: string = StockTrackerModule.select("selectedStockTrackerID")
    const stockTracker: StockTracker = StockTrackerModule.select("selectedStockTracker")
    // const history: FinancialHistory[] = StockTrackerModule.select("stockTrackerStatements")
    const activities: Activity[] = StockTrackerModule.select("stockTrackerActivities")

    const handleSettings = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_SETTING), [])

    const handleActivityPress = useCallback((activity: Activity) => {
        selectActivity(activity)
        navigation.navigate(Routes.ACTIVITY_DETAIL)
    }, [])

    const handleStockTrackerAction = animatedCallback(async () => {
        setBtnState(InteractiveButtonStates.PROCESSING)
        
        try {
            let result = { status: stockTracker.status }
            switch(stockTracker.status) {
                case(StockTrackerStatus.RUNNING):
                    result = await API.StockTracker.pauseStockTracker(stockTracker._id || "")
                    break
    
                case(StockTrackerStatus.PAUSED):
                    result = await API.StockTracker.playStockTracker(stockTracker._id || "")
                    break
            }
            updateSelectedStockTracker({ status: result.status } as StockTracker)
        }
        catch(error) {
            showAPIError(error)
        }
        finally {
            setBtnState(InteractiveButtonStates.NORMAL)
        }
    }, [stockTracker])


    const findStockTracker = useCallback(async () => {
        const stockTracker = await fetchStockTrackerByID(stockTrackerID)
        stockTracker && selectStockTracker(stockTracker)

        const activities = await fetchActivities({
            qty: AppConfig.QTY_INITIAL_ACTIVITIES,
            ref: stockTrackerID,
            page: 0
        })
        activities && addStockTrackerActivities(activities, true)
    }, [stockTrackerID])


    const handleRefresh = useCallback(async () => {
        try {
            await findStockTracker()
        }
        catch(error) {
            showAPIError(error)
        }
    }, [stockTrackerID])


    const handleLoadMoreData = useCallback(async (page: number) => {
        try {
            return fetchActivities({
                qty: AppConfig.QTY_INITIAL_ACTIVITIES,
                ref: stockTrackerID,
                page
            })
        }
        catch(error) {
            showAPIError(error)
            return Promise.reject()
        }
    }, [stockTrackerID])


    useEffectWhenReady(async () => {
        try {
            await findStockTracker()
            setLoading(false)
        }
        catch(error) {
            setFail(true)
        }
    }, () => selectStockTracker(undefined))

    return {
        fail,
        loading,
        btnState,
        stockTracker,
        amount: stockTracker && ((stockTracker?.buyPrice ?? 0) * (stockTracker?.qty ?? 0)) || 0,
        // transactions: adaptStatementTimeline(history),
        activities,
        handleStockTrackerAction,
        handleSettings,
        handleRefresh,
        handleLoadMoreData,
        handleActivityPress
    }
}