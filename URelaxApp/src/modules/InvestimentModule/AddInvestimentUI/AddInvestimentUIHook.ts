import { useNavigation } from "@react-navigation/native"
import { AppliedInvestiment, BrokerAccount, BrokerInvestiment, InvestimentType } from "honeybee-api"
import { useCallback, useState } from "react"
import InvestimentModule from ".."
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { Colors } from "../../../theming"
import BrokerModule from "../../BrokerModule"
import MessagingModule from "../../MessagingModule"
import { Routes } from "../../NavigationModule/const"
import { useStockTracker } from "../../StockTrackerModule/hook"
import { fetchAvailableInvestiments } from "../api"

export const useAddInvestimentUIHook = () => {

    const navigation = useNavigation()
    const { initStockTrackerByInvestiment } = useStockTracker()
    const { showAPIError, showError } = MessagingModule.actions()
    const [ finding, showFinding ] = useState(false)
    const [ investiments, setInvestiments ] = useState<BrokerInvestiment[]>()
    const [ suggestion, setSuggestion ] = useState<BrokerInvestiment>()
    const appliedInvestiments = InvestimentModule.select("appliedInvestiments")
    const brokerAccounts: BrokerAccount[] = BrokerModule.select("userBrokerAccounts")

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
        // updateSuggestionBtn({ activityState: InteractiveButtonStates.PROCESSING })
        // const suggestion = await fetchInvestimentSuggestion(account._id)
        // setSuggestion(suggestion)
        // updateSuggestionBtn({ activityState: InteractiveButtonStates.NORMAL })
    })

    const handleFindInvestiments = useCallback(async (description: string) => {
        try {
            if (description?.length > 1) {
                const codes = brokerAccounts.map(account => account.brokerCode)
                const investiments = await fetchAvailableInvestiments(description, codes)
                setInvestiments(investiments)
                return
            }
            setInvestiments([])
        }
        catch (error) {
            showAPIError(error)
        }
    }, [brokerAccounts])

    const handleAddInvestiment = animatedCallback((investiment: BrokerInvestiment) => {

        const alreadyAdded = appliedInvestiments.stocks.find((inv: AppliedInvestiment) => inv.investiment._id === investiment._id)
        if (!!alreadyAdded) {
            showError(ts("investiment_already_made"), ts("oops"))
            return
        }

        switch (investiment.type) {
            case InvestimentType.STOCK:
                initStockTrackerByInvestiment(investiment)
                navigation.navigate(Routes.STOCKTRACKER_WIZARD)
                break
        }
    }, [appliedInvestiments])

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