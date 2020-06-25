import { useNavigation } from "@react-navigation/native"
import { FinancialAnalysis } from "honeybee-api"
import { useCallback, useState } from "react"
import { Colors } from "../../../theming"
import { Routes } from "../../Navigation/const"
import { DataGraph } from "./AnalysisGraphic"

export const useInvestimentAnalysisUIHook = () => {

    const navigation = useNavigation()
    const uu: FinancialAnalysis[] = []
    const [ period, setPeriod ] = useState<"daily" | "weekly" | "monthly" | "yearly">("daily")

    const handleAnalysisDetail = useCallback(() => navigation.navigate(Routes.INVESTIMENT_ANALYSIS_DETAIL), [])

    const handleSelectGraph = useCallback((index) => console.log("seleced", index), [])

    return {
        dataGraph: [{
            label: "03/Jan 2020",
            value: 12,
            color: Colors.BLUES_2
        }
        ,{
            label: "04/Jan 2020",
            value: 32,
            color: Colors.BLUES_2
        },{
            label: "Jan/2020",
            value: 53,
            color: Colors.BLUES_2
        },{
            label: "Jan/2020",
            value: 34,
            color: Colors.BLUES_2
        },{
            label: "Jan/2020",
            value: 29,
            color: Colors.BLUES_2
        },{
            label: "Jan/2020",
            value: 32,
            color: Colors.BLUES_2
        },{
            label: "Jan/2020",
            value: 6,
            color: Colors.BLUES_2
        }
        ] as DataGraph[],
        
        patrimony: 0,
        patrimonyVariation: 0,
        period,
        setPeriod,
        handleAnalysisDetail,
        handleSelectGraph
    }
}