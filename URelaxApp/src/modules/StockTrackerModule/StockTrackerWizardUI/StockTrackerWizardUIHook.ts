import { useNavigation } from "@react-navigation/native"
import { API, Frequency, StockTracker, Strategy } from "honeybee-api"
import { useCallback, useState } from "react"
import StockTrackerModule from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { Routes } from "../../Navigation/const"
import { createStockTracker, updateStockTracker } from "../api"
import { StockTrackerWizardViews } from "../const"
import { useStockTracker } from "../hook"

const viewsSequence = [
    String(StockTrackerWizardViews.FREQUENCY),
    String(StockTrackerWizardViews.STRATEGY),
    String(StockTrackerWizardViews.TRANSACTION),
    String(StockTrackerWizardViews.REVIEW),
    String(StockTrackerWizardViews.DONE)
]

export const useStockTrackerWizardUIHook = () => {

    const navigation = useNavigation()
    const [ loading, setLoading ] = useState(true)
    const transient: StockTracker = StockTrackerModule.select("selectedStockTracker")
    const frequencies: Frequency[] = StockTrackerModule.select("frequencies")
    const strategies: Strategy[] = StockTrackerModule.select("strategies")
    const edit: boolean = StockTrackerModule.select("edit")
    const viewToEdit: StockTrackerWizardViews = StockTrackerModule.select("viewToEdit")
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
        if (edit) {
            await updateStockTracker(transient._id || "", input)
        }
        else {
            await createStockTracker(input)
        }
    }, [transient])

    const handleValidation = useCallback((index: number) => {
        return true
    }, [])

    const handleFlowEnded = useCallback(() => {
        edit ? navigation.goBack() : navigation.navigate(Routes.ADD_INVESTIMENT)
    }, [edit])

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

    return {
        sequence: edit ? [String(viewToEdit), String(StockTrackerWizardViews.DONE)] : viewsSequence,
        messageDone: edit ? "stock_tracker_updated" : "stock_tracker_created",
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