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
        currency: {
            amount: 100,
            qty: 10
        } as AppliedInvestiment,
        stocks: [{
            amount: 10,
            qty: 10
        }] as AppliedInvestiment[]
    })

    const handleAdd = useCallback(() => navigation.navigate(Routes.ADD_INVESTIMENT), [])

    const handleAnalysis = useCallback(() => navigation.navigate(Routes.INVESTIMENT_ANALYSIS), [])

    const handleStatements = useCallback(() => navigation.navigate(Routes.STATEMENT), [])
    
    useEffectWhenReady(async () => {
        try {
            const appliedInvestiments = await fetchAppiedInvestiments(account._id)
            
            if (appliedInvestiments) {
                const patrimony = arrays.sum(appliedInvestiments, item => item.amount)
                const currency = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.CURRENCY)
                const stocks = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.STOCK)
                
                // setInvestiments({
                //     patrimony,
                //     currency: currency[0],
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
        handleStatements
    }
}