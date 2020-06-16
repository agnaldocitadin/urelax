import { Account, AppliedInvestiment, InvestimentType } from "honeybee-api"
import { arrays } from "js-commons"
import { useState } from "react"
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import { fetchAppiedInvestiments } from "../api"

export const useInvestimentUIHook = () => {
    
    const account: Account = Identity.select("activeAccount")
    const [ investiments, setInvestiments ] = useState({
        patrimony: 0,
        currency: {} as AppliedInvestiment,
        stocks: [] as AppliedInvestiment[]
    })
    
    useEffectWhenReady(async () => {
        const appliedInvestiments = await fetchAppiedInvestiments(account._id)
        const patrimony = arrays.sum(appliedInvestiments, item => item.amount)
        const currency = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.CURRENCY)
        const stocks = appliedInvestiments.filter(inv => inv.investiment.type === InvestimentType.STOCK)
        
        setInvestiments({
            patrimony,
            currency: currency[0],
            stocks
        })
    })

    return investiments
}