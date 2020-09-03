import { useNavigation } from "@react-navigation/native"
import { API, AppliedInvestiment, Frequency, StockTracker, Strategy } from 'urelax-api'
import { useCallback, useState } from "react"
import StockTrackerModule from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import InvestimentModule from "../../InvestimentModule"
import { Routes } from "../../NavigationModule/const"
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
    const [ fail, setFail ] = useState(false)
    const transient: StockTracker = StockTrackerModule.select("selectedStockTracker")
    const frequencies: Frequency[] = StockTrackerModule.select("frequencies")
    const strategies: Strategy[] = StockTrackerModule.select("strategies")
    const edit: boolean = StockTrackerModule.select("edit")
    const viewToEdit: StockTrackerWizardViews = StockTrackerModule.select("viewToEdit")
    const { setStrategies, setFrequencies, updateSelectedStockTracker } = StockTrackerModule.actions()
    const { addAppliedInvestiment } = InvestimentModule.actions()
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
            const stockTracker = await createStockTracker(input)
            const newInvestiment: AppliedInvestiment = {
                brokerAccountName: stockTracker.brokerAccount?.accountName ?? "",
                investiment: stockTracker.stockInfo as any,
                refID: String(stockTracker._id),
                amount: 0,
                qty: 0
            }

            addAppliedInvestiment({ stocks: [newInvestiment] })
        }
    }, [edit, transient])

    const handleValidation = useCallback((index: number) => {
        return true
    }, [])

    const handleFlowEnded = useCallback(() => {
        edit ? navigation.goBack() : navigation.navigate(Routes.ADD_INVESTIMENT)
    }, [edit])

    const handleDisableButton = useCallback((view: string) => {

        const {
            frequency,
            strategy,
            strategySetting
        } = transient

        switch (view) {
            case String(StockTrackerWizardViews.FREQUENCY):
                return !frequency

            case String(StockTrackerWizardViews.STRATEGY):
                return !strategy

            case String(StockTrackerWizardViews.TRANSACTION):
                return !strategySetting?.autoAmountLimit && strategySetting?.stockAmountLimit === 0
        
            default:
                return false
        }
        
    }, [transient])

    useEffectWhenReady(async () => {
        try {
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
        }
        catch(error) {
            setFail(true)
        }
    })

    return {
        sequence: edit ? [String(viewToEdit), String(StockTrackerWizardViews.DONE)] : viewsSequence,
        titleDone: edit ? "stock_tracker_updated" : "stock_tracker_created",
        messageDone: edit ? "stock_tracker_updated_msg" : "stock_tracker_created_msg",
        transient,
        frequencies,
        strategies,
        loading,
        fail,
        selectFrequency,
        selectStrategy,
        handleChangeStockAmountLimit,
        handleChangeAutoAmountLimit,
        handleFinish,
        handleValidation,
        handleFlowEnded,
        handleDisableButton
    }
}