import { useNavigation } from "@react-navigation/native"
import { useCallback } from "react"
import { Routes } from "../../Navigation/const"

export const useInvestimentAnalysisUIHook = () => {

    const navigation = useNavigation()

    const handleAnalysisDetail = useCallback(() => navigation.navigate(Routes.INVESTIMENT_ANALYSIS_DETAIL), [])

    return {
        handleAnalysisDetail
    }
}