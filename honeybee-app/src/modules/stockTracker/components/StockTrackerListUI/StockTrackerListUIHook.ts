import { StockTracker } from "honeybee-api"
import { useCallback, useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { animatedCallback, useEffectWhenReady } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { appendStockTrackers, prepateStockTrackerToCreate, resetStockTrackerModule, selectStockTracker } from "../../actions"
import { fetchActiveStockTrackersQuery } from "../../api"
import { getStockTrackerRoutes } from "../../reducer"

export const useStockTrackerListUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const [ loading, setLoading ] = useState(true)
    const [ fail, setFail ] = useState(false)
    const { stockTrackers, isEditing, balanceSheet } = useSelector((state: States) => state.STOCK_TRACKER)
    const userAcount = useSelector((state: States) => state.SIGNIN.authenticatedUser)
    const { stocks, stockVariation } = useSelector((state: States) => state.DASHBOARD.balanceSummary)

    const handleStockTrackerPreview = animatedCallback((stockTracker: StockTracker) => {
        dispatch(selectStockTracker(stockTracker))
        navigation.navigate(Routes.StockTrackerPreviewUI)
    })

    const handleAddStockTracker = animatedCallback(() => {
        dispatch(prepateStockTrackerToCreate(userAcount))
        const initRoute = getStockTrackerRoutes(userAcount.simulation || false, isEditing)[1]
        navigation.navigate(initRoute)
    })

    const handleStockAmount = useCallback((stockTracker: StockTracker) => {
        let stock = balanceSheet?.stocks.find(stock => stock.symbol === stockTracker?.stock?.symbol)
        if (stock) {
            return stock?.lastAvailablePrice || 0 * stock?.qty
        }
        return 0
    }, [])

    useEffectWhenReady(async () => {
        try {
            let stockTrackers = await fetchActiveStockTrackersQuery(userAcount._id || "")
            dispatch(appendStockTrackers(stockTrackers))
            setLoading(false)
        }
        catch(error) {
            setFail(true)
        }
    }, () => dispatch(resetStockTrackerModule()))

    return {
        fail,
        loading,
        stockAmount: stocks || 0,
        stockVariation,
        stockTrackers,
        handleStockTrackerPreview,
        handleAddStockTracker,
        handleStockAmount
    }
}