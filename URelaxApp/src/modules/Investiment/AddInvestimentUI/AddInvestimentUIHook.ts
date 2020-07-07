import { useNavigation } from "@react-navigation/native"
import { BrokerInvestiment } from "honeybee-api"
import { useCallback, useState } from "react"
import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { Colors } from "../../../theming"
import { Routes } from "../../Navigation/const"
import { fetchAvailableInvestiments } from "../api"

export const useAddInvestimentUIHook = () => {

    const navigation = useNavigation()
    const [ finding, showFinding ] = useState(false)
    const [ investiments, setInvestiments ] = useState<BrokerInvestiment[]>()

    const [ suggestionBtnData, updateSuggestionBtn ] = useInteractiveButton({
        text: ts("suggest_an_investiment"),
        textColor: Colors.WHITE,
        icon: "auto-fix",
        iconColor: Colors.WHITE,
    })

    const handleSuggestion = animatedCallback(() => {
        updateSuggestionBtn({ activityState: InteractiveButtonStates.PROCESSING })
        updateSuggestionBtn({ activityState: InteractiveButtonStates.NORMAL })
    })

    const handleFindInvestiments = useCallback(async (description: string) => {
        if (description?.length > 3) {
            const investiments = await fetchAvailableInvestiments(description)
            setInvestiments(investiments)
        }
    }, [])

    const handleAddInvestiment = animatedCallback((investiment: BrokerInvestiment) => {
        console.log(investiment.type)
        navigation.navigate(Routes.STOCKTRACKER_WIZARD)
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