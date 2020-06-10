import { useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { useDispatch } from "react-redux"
import { Routes } from "../../Navigation/const"

export const useDashboardUIHook = () => {

    const navigation = useNavigation()
    const dispatch = useDispatch()

    const [ refreshing, setRefreshing ] = useState(false)

    const handleInvestiments = useCallback(() => navigation.navigate(Routes.INVESTIMENT), [])

    const handleRefresh = useCallback(async () => {
        setRefreshing(true)
        await refresh()
        setRefreshing(false)
    }, [])

    const refresh = useCallback(async () => {
        try {
        }
        catch(error) {
        }
    }, []) //_id

    // useEffectWhenReady(() => refresh())

    return {
        refreshing,
        handleInvestiments,
        handleRefresh
    }
}