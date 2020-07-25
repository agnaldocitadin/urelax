import { FinancialAnalysis } from "honeybee-api"
import { useCallback, useState } from "react"
import Investiment from ".."

export const useInvestimentAnalysisDetailUIHook = () => {

    const analysis: FinancialAnalysis[] = Investiment.select("analysis")
    const selectedGraph: number = Investiment.select("selectedGraphIndex")
    const [ positiveProfit, setPositiveProfit ] = useState(true)
    const [ negativeProfit, setNegativeProfit ] = useState(true)

    const handlePositiveProfit = useCallback(() => {
        setPositiveProfit(old => {
            if (!negativeProfit) handleNegativeProfit()
            return !old
        })
    }, [negativeProfit, positiveProfit])

    const handleNegativeProfit = useCallback(() => {
        setNegativeProfit(old => {
            if (!positiveProfit) handlePositiveProfit()
            return !old
        })
    }, [positiveProfit, negativeProfit])

    const items = () => {
        return analysis[selectedGraph].items.filter(item => {
            return (positiveProfit && item.variation >= 0) || (negativeProfit && item.variation <= 0)
        })
    }

    return {
        analysis: analysis[selectedGraph],
        selectedItems: items(),
        positiveProfit,
        negativeProfit,
        handlePositiveProfit,
        handleNegativeProfit
    }
}