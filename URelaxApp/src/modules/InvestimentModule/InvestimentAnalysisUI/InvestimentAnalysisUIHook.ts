import { useNavigation } from "@react-navigation/native"
import { Account, BrokerAccount, FinancialAnalysis, FinancialAnalysisPeriod } from "honeybee-api"
import { useCallback, useState } from "react"
import Investiment from ".."
import { useEffectWhenReady } from "../../../core/Commons.hook"
import { Colors } from "../../../theming"
import BrokerModule from "../../BrokerModule"
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
    const brokerAccounts: BrokerAccount[] = BrokerModule.select("userBrokerAccounts")
    const [ period, setPeriod ] = useState<FinancialAnalysisPeriod>(FinancialAnalysisPeriod.DAILY)
    const [ loading, setLoading ] = useState(true)
    const [ finding, setFinding ] = useState(false)
    const [ fail, setFail ] = useState(false)

    const handleAnalysisDetail = useCallback(() => {
        navigation.navigate(Routes.INVESTIMENT_ANALYSIS_DETAIL)
    }, [])

    const handleSelectGraph = useCallback((index: number) => {
        selectGraphIndex(index)
    }, [])

    const findFinancialData =  useCallback(async (period: FinancialAnalysisPeriod, resetIndex: boolean) => {
        setFinding(true)
        setPeriod(period)
        const ids = brokerAccounts.map(account => account._id)
        const analysis = await fetchFinancialAnalysis(ids, period)
        addAnalysis(analysis, true)
        if (resetIndex) {
            handleSelectGraph(0)
        }
        setFinding(false)
    }, [brokerAccounts])

    const handlePeriodSelection = useCallback(async (period: FinancialAnalysisPeriod, resetIndex: boolean = true) => {
        try {
            await findFinancialData(period, resetIndex)
        }
        catch(error) {
            showAPIError(error)
            setFinding(false)
        }
    }, [])

    const handleLoadMore = useCallback((page: number) => {
        // TODO
        return Promise.resolve([] as DataGraph[])
    }, [])

    useEffectWhenReady(async () => {
        try {
            await findFinancialData(period, false)
            setLoading(false)
        }
        catch (error) {
            setFail(true)
        }
    })

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
        loading,
        finding,
        fail,
        noData: dataGraph.length === 0,
        handlePeriodSelection,
        handleAnalysisDetail,
        handleSelectGraph,
        handleLoadMore
    }
}