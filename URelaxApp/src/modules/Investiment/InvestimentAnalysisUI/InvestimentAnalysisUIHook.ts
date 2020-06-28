import { useNavigation } from "@react-navigation/native"
import { Account, FinancialAnalysis, FinancialAnalysisPeriod } from "honeybee-api"
import { useCallback, useState } from "react"
import Investiment from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { Colors } from "../../../theming"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import { fetchFinancialAnalysis } from "../api"
import { DataGraph } from "./AnalysisGraphic"

export const useInvestimentAnalysisUIHook = () => {

    const navigation = useNavigation()
    const { showAPIError } = Messaging.actions()
    const { addAnalysis, selectAnalysis } = Investiment.actions()
    const account: Account = Identity.select("activeAccount")
    const analysis: FinancialAnalysis[] = Investiment.select("analysis")
    const [ period, setPeriod ] = useState<FinancialAnalysisPeriod>(FinancialAnalysisPeriod.DAILY)
    const [ selectedGraph, setSelectedGraph ] = useState<number>()

    const handleAnalysisDetail = useCallback(() => navigation.navigate(Routes.INVESTIMENT_ANALYSIS_DETAIL), [])

    const handleSelectGraph = useCallback((index?: number) => {
        setSelectedGraph(index)
        index && selectAnalysis(analysis[index])
    }, [analysis])

    const handlePeriodSelection = useCallback((period) => {
        handleSelectGraph(analysis.length -1)
        setPeriod(period)
    }, [])

    useEffectWhenReady(async () => {
        try {
            const analysis = await fetchFinancialAnalysis(account._id)
            addAnalysis(analysis, true)
        }
        catch(error) {
            showAPIError(error)
        }
    })

    const dataGraph = analysis.map(item => {
        return {
            label: item.label,
            value: item.amount,
            color: Colors.BLUES_3        
        } as DataGraph
    })

    const graph = selectedGraph !== undefined && analysis[selectedGraph] || undefined

    return {
        dataGraph,
        patrimony: graph?.amount || 0,
        patrimonyVariation: graph?.variation || 0,
        period,
        selectedGraph,
        handlePeriodSelection,
        handleAnalysisDetail,
        handleSelectGraph
    }
}