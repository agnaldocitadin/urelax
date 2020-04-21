import { useEffect } from "react"
import { Keyboard } from "react-native"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedCallback } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { showConfirm, showError, showSuccess } from "../../../message"
import { appendBrokerAccounts } from "../../actions"
import { createBrokerAccount } from "../../api"

export const useAccountReviewUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const account = useSelector((state: States) => state.BROKER.accountToUpdate)

    const handleSaveBrokerAccount = animatedCallback(async () => {
        try {
            let newAccount = await createBrokerAccount(account)
            dispatch(appendBrokerAccounts([newAccount]))
            dispatch(showSuccess(ts("broker_account_add_success"), ts("broker_account_add_success_msg")))
            navigation.navigate(Routes.AccountListUI)
        }
        catch(error) {
            dispatch(showError(JSON.stringify(error)))
        }
    })

    const handleClose = animatedCallback(() => {
        dispatch(showConfirm(ts("cancel_add"), ts("cancel_add_msg"), ()=> navigation.navigate(Routes.AccountListUI)))
    })

    useEffect(() => Keyboard.dismiss(), [])

    return { 
        account,
        handleSaveBrokerAccount,
        handleClose
    }
}