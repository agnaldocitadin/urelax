import { FinancialAnalysis } from "honeybee-api"
import { arrays } from "js-commons"
import { useCallback, useState } from "react"
import Investiment from ".."

export const useInvestimentAnalysisDetailUIHook = () => {

    const analysis: FinancialAnalysis[] = Investiment.select("analysis")
    const selectedGraph: number = Investiment.select("selectedGraphIndex")
    const [ positiveProfit, setPositiveProfit ] = useState(false)
    const [ negativeProfit, setNegativeProfit ] = useState(false)

    const handlePositiveProfit = useCallback(() => setPositiveProfit(old => !old), [])

    const handleNegativeProfit = useCallback(() => setNegativeProfit(old => !old), [])

    const items = () => {
        return analysis[selectedGraph].items.filter(item => {
            return (!positiveProfit && !negativeProfit) || (positiveProfit && item.variation >= 0) || (negativeProfit && item.variation <= 0)
        })
    }

    const its = items()

    return {
        profit: arrays.sum(its, item => item.profit),
        analysis: analysis[selectedGraph],
        selectedItems: items(),
        positiveProfit,
        negativeProfit,
        handlePositiveProfit,
        handleNegativeProfit
    }
}