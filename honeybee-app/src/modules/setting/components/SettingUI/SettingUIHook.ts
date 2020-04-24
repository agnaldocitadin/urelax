import { API, Preferences } from "honeybee-api"
import { Toast } from "native-base"
import { useCallback } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { useDispatch, useSelector } from "react-redux"
import { ts } from "../../../../core/I18n"
import { animatedCallback } from "../../../../hooks/Commons.hook"
import { Routes } from "../../../../navigations/Navigator"
import { States } from "../../../../reducers/Reducer"
import { resetDashboardData } from "../../../dashboard"
import { showAPIError, showConfirm, showError } from "../../../message"
import { FORCE_LOG_IN, registerAuthenticatedUser, signout } from "../../../signIn"
import { resetStorage, updateDataApp } from "../../../storage/storage"

/**
 *
 *
 * @param {NavigationStackProp} navigation
 * @returns
 */
export const useSettingUIHook = (navigation: NavigationStackProp) => {

    const dispatch = useDispatch()
    const user = useSelector((state: States) => state.SIGNIN.authenticatedUser)
    const handleAccountEdit = animatedCallback(() => navigation.navigate(Routes.AccountUI))

    const handleManageBrokkerAccount = animatedCallback(() => {
        if (user.simulation) {
            dispatch(showError(ts("not_allowed_to_manage_broker_accounts"), ts("operation_not_allowed")))
        }
        else {
            navigation.navigate(Routes.AccountListUI)
        }
    })

    const handleTradeNotification = useCallback(async (active: boolean) => {
        await API.updateUserPreferences(user._id || "", { receiveTradeNotification: active } as Preferences)
        let clone = Object.assign({}, user)
        if (clone.preferences) {
            clone.preferences.receiveTradeNotification = active
            dispatch(registerAuthenticatedUser(clone))
            Toast.show({
                duration: 3000,
                text: ts("settings_notification_msg", { 
                    notification: ts("trade_notification").toLowerCase(), 
                    state: (active ? ts("activated") : ts("deactivated")).toLowerCase()
                })
            })
        }
    }, [])

    const handleBalanceNotification = useCallback(async (active: boolean) => {
        await API.updateUserPreferences(user._id || "", { receiveBalanceNotification: active } as Preferences)
        let clone = Object.assign({}, user)
        if (clone.preferences) {
            clone.preferences.receiveBalanceNotification = active
            dispatch(registerAuthenticatedUser(clone))
            Toast.show({
                duration: 3000,
                text: ts("settings_notification_msg", { 
                    notification: ts("balance_notification").toLowerCase(), 
                    state: (active ? ts("activated") : ts("deactivated")).toLowerCase()
                })
            })
        }
    }, [])

    const handleAddTrackerPaused = useCallback(async (active: boolean) => {
        await API.updateUserPreferences(user._id || "", { addStockTrackerPaused: active } as Preferences)
        let clone = Object.assign({}, user)
        if (clone.preferences) {
            clone.preferences.addStockTrackerPaused = active
            dispatch(registerAuthenticatedUser(clone))
        }
    }, [])
    
    const handleAccountSimulation = animatedCallback(() => {
        dispatch(showConfirm(ts("switch_account"), ts("switch_account_msg"), async () => {
            try {
                const hasNoSimulation = !user.simulation && !user.simulationAccountId
                if (hasNoSimulation) {
                    await API.activateSimulationAccount(user._id)
                }
                
                await updateDataApp({ simulation: !user.simulation })
                dispatch(resetDashboardData())
                navigation.navigate(Routes.FastAuthUI, {[FORCE_LOG_IN]: true})
            }
            catch(error) {
                dispatch(showAPIError(error))
            }
        }))
    }, [user.simulation, user.simulationAccountId]) 
        
    const handleLogout = animatedCallback(() => {
        dispatch(showConfirm(ts("exit_app"), ts("exit_app_msg"), async () => {
            await resetStorage()
            dispatch(signout())
            dispatch(resetDashboardData())
            navigation.navigate(Routes.StartupStack)
        }))
    })

    return {
        nickname: user.nickname || "None",
        receiveTradeNotification: user.preferences?.receiveTradeNotification,
        receiveBalanceNotification: user.preferences?.receiveBalanceNotification,
        addStockTrackerPaused: user.preferences?.addStockTrackerPaused,
        simulationBtnLabel: user.simulation ? ts("goto_main_account") : ts("goto_simulation_account"),
        handleAccountEdit,
        handleAccountSimulation,
        handleLogout,
        handleManageBrokkerAccount,
        handleTradeNotification,
        handleBalanceNotification,
        handleAddTrackerPaused
    }
}