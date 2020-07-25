import { useNavigation } from "@react-navigation/native"
import { Account, FinancialAnalysis, FinancialAnalysisPeriod } from "honeybee-api"
import { useCallback, useState } from "react"
import Investiment from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { Colors } from "../../../theming"
import Identity from "../../IdentityModule"
import Messaging from "../../MessagingModule"
import { Routes } from "../../NavigationModule/const"
import { fetchFinancialAnalysis } from "../api"
import { DataGraph } from "./AnalysisGraphic"

export const useInvestimentAnalysisUIHook = () => {

    const navigation = useNavigation()
    const { showAPIError } = Messaging.actions()
    const { addAnalysis, selectGraphIndex } = Investiment.actions()
    const account: Account = Identity.select("activeAccount")
    const analysis: FinancialAnalysis[] = Investiment.select("analysis")
    const selectedGraph: number = Investiment.select("selectedGraphIndex")
    const [ period, setPeriod ] = useState<FinancialAnalysisPeriod>(FinancialAnalysisPeriod.DAILY)

    const handleAnalysisDetail = useCallback(() => {
        navigation.navigate(Routes.INVESTIMENT_ANALYSIS_DETAIL)
    }, [])

    const handleSelectGraph = useCallback((index: number) => {
        selectGraphIndex(index)
    }, [analysis])

    const handlePeriodSelection = useCallback(async (period: FinancialAnalysisPeriod, resetIndex: boolean = true) => {
        try {
            setPeriod(period)
            const analysis = await fetchFinancialAnalysis(account._id, period)
            addAnalysis(analysis, true)
            if (resetIndex) {
                handleSelectGraph(analysis.length -1)
            }
        }
        catch(error) {
            showAPIError(error)
        }
    }, [selectedGraph])

    useEffectWhenReady(() => handlePeriodSelection(period, false))

    const dataGraph = analysis.map(item => {
        return {
            label: item.label,
            value: item.amount,
            color: Colors.BLUES_3        
        } as DataGraph
    })

    const graphBar = selectedGraph !== undefined && analysis[selectedGraph] || undefined

    return {
        dataGraph,
        patrimony: graphBar?.amount || 0,
        patrimonyVariation: graphBar?.variation || 0,
        period,
        selectedGraph,
        handlePeriodSelection,
        handleAnalysisDetail,
        handleSelectGraph
    }
}