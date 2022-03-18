import { useNavigation } from "@react-navigation/native"
import { useCallback, useState } from "react"
import { API, AppliedInvestiment, Frequency, StockTracker, Strategy } from 'urelax-api'
import StockTrackerModule from ".."
import { InteractiveButtonData, InteractiveButtonStates } from "../../../components/InteractiveButton"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import InvestimentModule from "../../InvestimentModule"
import MessagingModule from "../../MessagingModule"
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
    const [ btnFormData, setBtnFormData ] = useState<InteractiveButtonData>({ text: ts("next") })
    const transient: StockTracker = StockTrackerModule.select("selectedStockTracker")
    const frequencies: Frequency[] = StockTrackerModule.select("frequencies")
    const strategies: Strategy[] = StockTrackerModule.select("strategies")
    const edit: boolean = StockTrackerModule.select("edit")
    const viewToEdit: StockTrackerWizardViews = StockTrackerModule.select("viewToEdit")
    const { setStrategies, setFrequencies, updateSelectedStockTracker } = StockTrackerModule.actions()
    const { addAppliedInvestiment } = InvestimentModule.actions()
    const { showAPIError } = MessagingModule.actions()
    const { convertToStockTrackerInput } = useStockTracker()
    const [ original, setInput ] = useState(Object.assign({}, transient))

    const update = useCallback((property: keyof StockTracker, value: any) => {
        setInput(old => ({
            ...old,
            [property]: value
        }))
    }, [original])
    
    const selectFrequency = animatedCallback((frequency: Frequency) => update("frequency", String(frequency._id)), [])
    const selectStrategy = useCallback((strategy: Strategy) => update("strategy", String(strategy._id)), [])

    const handleChangeStockAmountLimit = useCallback((value: number) => {
        if (original.strategySetting) {
            update("strategySetting", { ...original.strategySetting, stockAmountLimit: value })
        }
    }, [original])

    const handleChangeAutoAmountLimit = useCallback((value: boolean) => {
        if (original.strategySetting) {
            update("strategySetting", { ...original.strategySetting, autoAmountLimit: value })
        } 
    }, [original])

    const handleFinish = useCallback(async () => {
        try {
            setBtnFormData(old => ({
                ...old,
                activityState: InteractiveButtonStates.PROCESSING 
            }))
            
            const input = convertToStockTrackerInput(original)
            if (edit) {
                await updateStockTracker(original._id || "", input)
                updateSelectedStockTracker(original)
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
            setBtnFormData(old => ({
                ...old,
                activityState: InteractiveButtonStates.NORMAL,
                text: ts("done")
            }))
        }
        catch (error) {
            showAPIError(error)
            setBtnFormData(old => ({
                ...old,
                activityState: InteractiveButtonStates.NORMAL
            }))
            throw error
        }
    }, [edit, original])

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
        } = original

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
        
    }, [original])

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
        btnFormData,
        transient: original,
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