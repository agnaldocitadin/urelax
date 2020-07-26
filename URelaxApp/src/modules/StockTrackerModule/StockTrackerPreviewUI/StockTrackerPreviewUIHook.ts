import { useNavigation } from "@react-navigation/native"
import { API, FinancialHistory, StockTracker, StockTrackerStatus, Transaction } from "honeybee-api"
import { useState } from "react"
import StockTrackerModule from ".."
import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
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

    
    const handleSettings = animatedCallback(() => navigation.navigate(Routes.STOCKTRACKER_SETTING), [])
    

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
            const stockTracker = await fetchStockTrackerByID(stockTrackerID)
            stockTracker && selectStockTracker(stockTracker)
            // TODO load statements
        }
        catch(error) {
            showAPIError(error)
        }
    }, [stockTrackerID])


    const handleLoadMoreData = animatedCallback(async (page: number) => {
        try {
            // TODO load statements
            return Promise.resolve([] as Transaction[])
        }
        catch(error) {
            showAPIError(error)
        }
    }, [stockTrackerID])


    useEffectWhenReady(async () => {
        try {
            await handleRefresh()
            setLoading(false)
        }
        catch(error) {
            console.error(error)
            setFail(true)
        }
    })

    return {
        fail,
        loading,
        btnState,
        stockTracker,
        amount: stockTracker && ((stockTracker?.buyPrice ?? 0) * (stockTracker?.qty ?? 0)) || 0,
        transactions: adaptStatementTimeline(history),
        handleStockTrackerAction,
        handleSettings,
        handleRefresh,
        handleLoadMoreData
    }
}