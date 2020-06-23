import { useNavigation } from "@react-navigation/native"
import { Account, AppliedInvestiment, InvestimentType } from "honeybee-api"
import { arrays } from "js-commons"
import { useCallback, useState } from "react"
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Messaging from "../../Messaging"
import { Routes } from "../../Navigation/const"
import { fetchAppiedInvestiments } from "../api"

export const useInvestimentUIHook = () => {
    
    const navigation = useNavigation()
    const { showAPIError } = Messaging.actions()
    const account: Account = Identity.select("activeAccount")
    const [ investiments, setInvestiments ] = useState({
        patrimony: 0,
        currency: [{
            brokerAccountName: "0001-0",
            amount: 234,
            qty: 10,
            investiment: {
                description: "Real (R$)",
                broker:{
                    name: "Clear"
                }
            }
        },{
            brokerAccountName: "0001-0",
            amount: 839,
            qty: 10,
            investiment: {
                description: "Real (R$)",
                broker:{
                    name: "Easyinvest"
                }
            }
        }/*,{
            amount: 3249,
            qty: 10,
            investiment: {
                description: "Real (R$)"
            }
        }*/] as AppliedInvestiment[],
        stocks: [{
            brokerAccountName: "0123456",
            amount: 2039000,
            qty: 10,
            investiment: {
                description: "Azul Linhas Aéreas (AZUL4)",
                broker: {
                    name: "XP Investimentos"
                }
            }
        },{
            brokerAccountName: "0001-0",
            amount: 1293,
            qty: 10,
            investiment: {
                description: "Lojas Renner (RENN3)",
                broker: {
                    name: "Modalmais"
                }
            }
        }] as AppliedInvestiment[]
    })

    const handleAdd = useCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT), [])

    const handleAnalysis = useCallback(() => navigation.navigate(Routes.INVESTIMENT_ANALYSIS), [])

    const handleStatements = useCallback(() => navigation.navigate(Routes.STATEMENT), [])

    const handleFilter = useCallback(() => navigation.navigate(Routes.INVESTIMENT_FILTER), [])

    const handleStockTracker = useCallback(() => navigation.navigate(Routes.STOCKTRACKER_PREVIEW), [])
    
    useEffectWhenReady(async () => {
        try {
            const appliedInvestiments = await fetchAppiedInvestiments(account._id)
            
            if (appliedInvestiments) {
                const patrimony = arrays.sum(appliedInvestiments, item => item.amount)
                const currency = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.CURRENCY)
                const stocks = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.STOCK)
                
                // setInvestiments({
                //     patrimony,
                //     currency,
                //     stocks
                // })
            }
        }
        catch(error) {
            showAPIError(error)
        }
    })

    return {
        investiments,
        handleAdd,
        handleAnalysis,
        handleFilter,
        handleStatements,
        handleStockTracker
    }
}