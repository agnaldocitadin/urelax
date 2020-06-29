import { useNavigation } from "@react-navigation/native"
import { FinancialHistory, Transaction } from "honeybee-api"
import { useCallback } from "react"
import AppConfig from "../../../core/AppConfig"
import { animatedCallback, useEffectWhenReady } from "../../../core/Commons.hook"
import Identity from "../../Identity"
import Investiment from "../../Investiment"
import { fetchFinancialHistory } from "../../Investiment/api"
import Messaging from "../../Messaging"
import { adaptStatementTimeline } from "../StatementTimeline"

export const useStatementUIHook = () => {

    const navigation = useNavigation()
    const { showAPIError } = Messaging.actions()
    const account = Identity.select("activeAccount")
    const { addHistory, selectEvent } = Investiment.actions()
    const statements: FinancialHistory[] = Investiment.select("statements")

    const handleEventPress = animatedCallback((transaction: Transaction) => {
        // selectEvent(event)
        // navigation.navigate(Routes.STATEMENT_DETAIL)
    })

    const handleRefresh = useCallback(async (reset?: boolean) => {
        try {
            let history = await fetchFinancialHistory(account._id, 0, AppConfig.QTY_INITIAL_ACTIVITIES)
            addHistory(history, reset)
            // addHistory([{
            //     date: new Date()
            // }], reset)
        }
        catch(error) {
            console.error(error)
        }
    }, [])

    const handleLoadMoreData = useCallback(async (page: number) => {
        try {
            // TODO Transformar FinancialHistory[] em Transaction[]
            // return await fetchFinancialHistory(account._id, page, AppConfig.QTY_INITIAL_ACTIVITIES)
            return adaptStatementTimeline([] as FinancialHistory[])
        }
        catch(error) {
            showAPIError(error)
            return Promise.reject()
        }
    }, [])

    useEffectWhenReady(() => handleRefresh(true))

    return {
        statements: adaptStatementTimeline(statements),
        handleEventPress,
        handleRefresh,
        handleLoadMoreData
    }
}