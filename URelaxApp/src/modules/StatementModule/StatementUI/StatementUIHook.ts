import { FinancialHistory } from "honeybee-api"
import { useCallback, useState } from "react"
import AppConfig from "../../../core/AppConfig"
import { useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../IdentityModule"
import Investiment from "../../InvestimentModule"
import { fetchFinancialHistory } from "../../InvestimentModule/api"
import Messaging from "../../MessagingModule"
import { adaptStatementTimeline } from "../StatementTimeline"

export const useStatementUIHook = () => {

    const { showAPIError } = Messaging.actions()
    const { addHistory, selectEvent } = Investiment.actions()
    const account = Identity.select("activeAccount")
    const statements: FinancialHistory[] = Investiment.select("statements")
    const [ loading, setLoading ] = useState(true)

    const handleRefresh = useCallback(async (reset?: boolean) => {
        try {
            let history = await fetchFinancialHistory(account._id, 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            addHistory(history, reset)
        }
        catch(error) {
            console.error(error)
            showAPIError(error)
        }
    }, [])

    const handleLoadMoreData = useCallback(async (page: number) => {
        try {
            let history = await fetchFinancialHistory(account._id, page, 20)
            return adaptStatementTimeline(history)
        }
        catch(error) {
            showAPIError(error)
            return Promise.reject()
        }
    }, [])

    useEffectWhenReady(async () => {
        await handleRefresh(true)
        setLoading(false)
    })

    return {
        loading,
        statements: adaptStatementTimeline(statements),
        handleRefresh,
        handleLoadMoreData
    }
}