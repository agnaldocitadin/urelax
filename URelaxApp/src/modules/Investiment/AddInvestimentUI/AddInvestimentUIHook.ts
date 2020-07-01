import { InteractiveButtonStates } from "../../../components/InteractiveButton"
import { useInteractiveButton } from "../../../components/InteractiveButton/InteractiveButtonHook"
import { animatedCallback } from "../../../core/Commons.hook"
import { ts } from "../../../core/I18n"
import { Colors } from "../../../theming"

export const useAddInvestimentUIHook = () => {

    const [ suggestionBtnData, updateSuggestionBtn ] = useInteractiveButton({
        text: ts("suggest_an_investiment"),
        textColor: Colors.WHITE,
        icon: "auto-fix",
        iconColor: Colors.WHITE,
    })

    const handleSuggestion = animatedCallback(() => {
        updateSuggestionBtn({ activityState: InteractiveButtonStates.PROCESSING })

        // updateSuggestionBtn({ activityState: InteractiveButtonStates.NORMAL })
    })

    return {
        suggestionBtnData,
        handleSuggestion
    }
}