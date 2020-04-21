import { StockTracker } from "honeybee-api"
import { useState } from "react"
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
    const stockTrackers = useSelector((state: States) => state.STOCK_TRACKER.stockTrackers)
    const userAcount = useSelector((state: States) => state.SIGNIN.authenticatedUser)
    const isEditing = useSelector((state: States) => state.STOCK_TRACKER.isEditing)
    const stockAmount = useSelector((state: States) => state.DASHBOARD.balanceSummary.stocks || 0)

    const handleStockTrackerPreview = animatedCallback((stockTracker: StockTracker) => {
        dispatch(selectStockTracker(stockTracker))
        navigation.navigate(Routes.StockTrackerPreviewUI)
    })

    const handleAddStockTracker = animatedCallback(() => {
        dispatch(prepateStockTrackerToCreate(userAcount))
        const initRoute = getStockTrackerRoutes(userAcount.simulation || false, isEditing)[1]
        navigation.navigate(initRoute)
    })

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
        stockAmount,
        stockTrackers,
        handleStockTrackerPreview,
        handleAddStockTracker
    }
}