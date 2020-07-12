import { useNavigation } from "@react-navigation/native"
import { API, Frequency, StockTracker, Strategy } from "honeybee-api"
import { useCallback, useState } from "react"
import StockTrackerModule from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { Routes } from "../../Navigation/const"
import { createStockTracker } from "../api"
import { useStockTracker } from "../hook"

export const useStockTrackerWizardUIHook = () => {

    const navigation = useNavigation()
    const [ loading, setLoading ] = useState(true)
    const transient: StockTracker = StockTrackerModule.select("selectedStockTracker")
    const frequencies: Frequency[] = StockTrackerModule.select("frequencies")
    const strategies: Strategy[] = StockTrackerModule.select("strategies")
    const { setStrategies, setFrequencies, updateSelectedStockTracker } = StockTrackerModule.actions()
    const { convertToStockTrackerInput } = useStockTracker()
    

    const selectFrequency = useCallback((frequency: Frequency) => {
        transient["frequency"] = String(frequency._id)
        updateSelectedStockTracker(transient)
    }, [transient])

    const selectStrategy = useCallback((strategy: Strategy) => {
        transient["strategy"] = String(strategy._id)
        updateSelectedStockTracker(transient)
    }, [transient])

    const handleChangeStockAmountLimit = useCallback((value: number) => {
        if (transient.strategySetting) {
            transient.strategySetting["stockAmountLimit"] = value
            updateSelectedStockTracker(transient)
        }
    }, [transient])

    const handleChangeAutoAmountLimit = useCallback((value: boolean) => {
        if (transient.strategySetting) {
            transient.strategySetting["autoAmountLimit"] = value
            updateSelectedStockTracker(transient)
        } 
    }, [transient])

    const handleFinish = useCallback(async () => {
        const input = convertToStockTrackerInput(transient)
        await createStockTracker(input)
    }, [transient])

    const handleValidation = useCallback((index: number) => {
        return true
    }, [])

    const handleFlowEnded = useCallback(() => {
        navigation.navigate(Routes.ADD_INVESTIMENT)
    }, [])

    useEffectWhenReady(async () => {
        const frequencies = await API.StockTracker.fetchAvailableFrequencies(`
            _id
            description
        `)
        setFrequencies(frequencies)

        const strategies = await API.StockTracker.fetchAvailableStrategies(`
            _id
            description
        `)
        setStrategies(strategies)
        setLoading(false)
    })

    console.log("------>>>", transient)

    return {
        transient,
        frequencies,
        strategies,
        loading,
        selectFrequency,
        selectStrategy,
        handleChangeStockAmountLimit,
        handleChangeAutoAmountLimit,
        handleFinish,
        handleValidation,
        handleFlowEnded
    }
}