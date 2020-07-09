import { API, Frequency, StockTracker, Strategy } from "honeybee-api"
import { useCallback, useState } from "react"
import StockTrackerModule from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { createStockTracker } from "../api"
import { useStockTracker } from "../hook"

export const useStockTrackerWizardUIHook = () => {

    const [ idx, setIdx ] = useState(0)
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

    const handleChangeStockAmountLimit = useCallback((value: string) => {
        if (transient.strategySetting) {
            transient.strategySetting["stockAmountLimit"] = Number(value)
            updateSelectedStockTracker(transient)
        }
    }, [transient])

    const handleChangeAutoAmountLimit = useCallback((value: boolean) => {
        if (transient.strategySetting) {
            transient.strategySetting["autoAmountLimit"] = value
            updateSelectedStockTracker(transient)
        } 
    }, [transient])

    const handleProcessWizard = useCallback(async () => {
        if (idx === 3) {
            const input = convertToStockTrackerInput(transient)
            await createStockTracker(input)
            setIdx(old => (old + 1))
        }
        else {
            setIdx(old => (old + 1))
        }
    }, [idx])

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
    })

    return {
        idx,
        transient,
        frequencies,
        strategies,
        selectFrequency,
        selectStrategy,
        handleChangeStockAmountLimit,
        handleChangeAutoAmountLimit,
        handleProcessWizard
    }
}