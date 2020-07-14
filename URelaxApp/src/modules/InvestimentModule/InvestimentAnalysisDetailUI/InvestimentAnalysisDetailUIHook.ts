import { FinancialAnalysis } from "honeybee-api"
import Investiment from ".."

export const useInvestimentAnalysisDetailUIHook = () => {

    const analysis: FinancialAnalysis = Investiment.select("selectedFinancialAnalysis")

    return {
        analysis
    }
}