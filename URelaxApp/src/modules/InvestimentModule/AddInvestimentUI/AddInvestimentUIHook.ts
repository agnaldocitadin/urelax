import { useNavigation } from "@react-navigation/native"
import { Account, BrokerInvestiment, InvestimentType } from "honeybee-api"
import { useCallback, useState } from "react"
import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { Colors } from "../../../theming"
import IdentityModule from "../../IdentityModule"
import { Routes } from "../../NavigationModule/const"
import { useStockTracker } from "../../StockTrackerModule/hook"
import { fetchAvailableInvestiments, fetchInvestimentSuggestion } from "../api"

export const useAddInvestimentUIHook = () => {

    const navigation = useNavigation()
    const { initStockTrackerByInvestiment } = useStockTracker()
    const [ finding, showFinding ] = useState(false)
    const [ investiments, setInvestiments ] = useState<BrokerInvestiment[]>()
    const [ suggestion, setSuggestion ] = useState<BrokerInvestiment>()
    const account: Account = IdentityModule.select("activeAccount")

    const [ suggestionBtnData, updateSuggestionBtn ] = useInteractiveButton({
        text: ts("suggest_an_investiment"),
        textColor: Colors.WHITE,
        icon: "auto-fix",
        iconColor: Colors.WHITE,
    })

    const handleSearch = useCallback((isFinding: boolean) => {
        showFinding(isFinding)
        setSuggestion(undefined)
        if (!isFinding) setInvestiments([])
    }, [])

    const handleSuggestion = animatedCallback(async () => {
        updateSuggestionBtn({ activityState: InteractiveButtonStates.PROCESSING })
        const suggestion = await fetchInvestimentSuggestion(account._id)
        setSuggestion(suggestion)
        updateSuggestionBtn({ activityState: InteractiveButtonStates.NORMAL })
    })

    const handleFindInvestiments = useCallback(async (description: string) => {
        if (description?.length > 3) {
            const investiments = await fetchAvailableInvestiments(description)
            setInvestiments(investiments)
        }
    }, [])

    const handleAddInvestiment = animatedCallback((investiment: BrokerInvestiment) => {
        switch (investiment.type) {
            case InvestimentType.STOCK:
                initStockTrackerByInvestiment(investiment)
                navigation.navigate(Routes.STOCKTRACKER_WIZARD)
                break
        }
    })

    return {
        investiments,
        finding,
        suggestionBtnData,
        suggestion,
        handleSearch,
        handleFindInvestiments,
        handleSuggestion,
        handleAddInvestiment
    }
}