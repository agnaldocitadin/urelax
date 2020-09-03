import { FinancialAnalysis } from 'urelax-api'
import { arrays } from "js-commons"
import { useCallback, useState } from "react"
import Investiment from ".."
import { ts } from "../../../core/I18n"

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
    
    let label
    if (positiveProfit && !negativeProfit) {
        label = ts("gain")
    }
    else if (!positiveProfit && negativeProfit) {
        label = ts("loss")
    }
    else {
        label = ts("result")
    }

    return {
        label,
        profit: arrays.sum(its, item => item.profit),
        analysis: analysis[selectedGraph],
        selectedItems: items(),
        positiveProfit,
        negativeProfit,
        handlePositiveProfit,
        handleNegativeProfit
    }
}