import { useNavigation } from "@react-navigation/native"
import { BrokerInvestiment, InvestimentType } from "honeybee-api"
import { useCallback, useState } from "react"
import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { Colors } from "../../../theming"
import { Routes } from "../../NavigationModule/const"
import { useStockTracker } from "../../StockTrackerModule/hook"
import { fetchAvailableInvestiments } from "../api"

export const useAddInvestimentUIHook = () => {

    const navigation = useNavigation()
    const { initStockTrackerByInvestiment } = useStockTracker()
    const [ finding, showFinding ] = useState(false)
    const [ investiments, setInvestiments ] = useState<BrokerInvestiment[]>()

    const [ suggestionBtnData, updateSuggestionBtn ] = useInteractiveButton({
        text: ts("suggest_an_investiment"),
        textColor: Colors.WHITE,
        icon: "auto-fix",
        iconColor: Colors.WHITE,
    })

    const handleSuggestion = animatedCallback(async () => {
        updateSuggestionBtn({ activityState: InteractiveButtonStates.PROCESSING })
        await handleFindInvestiments("invest")
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
        showFinding,
        handleFindInvestiments,
        handleSuggestion,
        handleAddInvestiment
    }
}