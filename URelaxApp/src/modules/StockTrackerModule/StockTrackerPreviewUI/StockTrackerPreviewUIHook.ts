import { useNavigation } from "@react-navigation/native"
import { Activity, API, FinancialHistory, StockTracker, StockTrackerStatus, Transaction } from "honeybee-api"
import { useCallback, useState } from "react"
import StockTrackerModule from ".."
import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import { fetchFinancialHistory } from "../../InvestimentModule/api"
import Messaging from "../../MessagingModule"
import { Routes } from "../../NavigationModule/const"
import { adaptStatementTimeline } from "../../StatementModule/StatementTimeline"
import { fetchStockTrackerByID } from "../api"

export const useStockTrackerPreviewUIHook = () => {

    const navigation = useNavigation()
    const [ loading, setLoading] = useState(true)
    const [ fail, setFail] = useState(false)
    const [ btnState, setBtnState ] = useState(InteractiveButtonStates.NORMAL)
    const { showAPIError } = Messaging.actions()
    const { selectStockTracker, addStockTrackerStatements, updateSelectedStockTracker } = StockTrackerModule.actions()
    const stockTrackerID: string = StockTrackerModule.select("selectedStockTrackerID")
    const stockTracker: StockTracker = StockTrackerModule.select("selectedStockTracker")
    const history: FinancialHistory[] = StockTrackerModule.select("stockTrackerStatements")

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
        navigation.navigate(Routes.STOCKTRACKER_SETTING)
    }, [])
    
    const handleSelectActivity = animatedCallback((activity: Activity) => {
        // dispatch(selectActivity(activity))
        // navigation.navigate(Routes.ActivityDetailUI)
    })
    
    const handleStockTrackerAction = animatedCallback(async () => {
        try {
            let result = { status: stockTracker.status }
            setBtnState(InteractiveButtonStates.PROCESSING)
            
            switch(stockTracker.status) {
                case(StockTrackerStatus.RUNNING):
                    result = await API.StockTracker.pauseStockTracker(stockTracker._id || "")
                    break
    
                case(StockTrackerStatus.PAUSED):
                    result = await API.StockTracker.playStockTracker(stockTracker._id || "")
                    break
            }

            updateSelectedStockTracker({ status: result.status } as StockTracker)
            setBtnState(InteractiveButtonStates.NORMAL)
        }
        catch(error) {
            showAPIError(error)
        }
    }, [stockTracker])

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
            const stockTracker = await fetchStockTrackerByID(stockTrackerID)
            stockTracker && selectStockTracker(stockTracker)

            const history = await fetchFinancialHistory("", 0, 10)
            history && addStockTrackerStatements(history, true)
            setLoading(false)
        }
        catch(error) {
            console.error(error)
            setFail(true)
        }
    })

    return {
        stockTracker,
        amount: stockTracker && (stockTracker?.buyPrice * stockTracker?.qty) || 0,
        transactions: adaptStatementTimeline(history),
        loading,
        fail,
        btnState,
        handleStockTrackerAction,
        handleSettings,
        handleSelectActivity,
        handleRefresh,
        handleLoadMoreData
    }
}