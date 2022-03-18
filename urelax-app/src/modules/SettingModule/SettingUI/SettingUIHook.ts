import { Account, API, Preferences } from 'urelax-api'
import { useCallback } from "react"
import IdentityModule from "../../IdentityModule"
import MessagingModule from "../../MessagingModule"

export const useSettingUIHook = () => {

    const account: Account = IdentityModule.select("activeAccount")
    const { updateActiveAccount } = IdentityModule.actions()
    const { showAPIError } = MessagingModule.actions()

    // FIXME quando altera o account, tem que alterar no profile tbm.
    const update = useCallback(async (property: keyof Preferences, value: any) => {
        const backup: Account = Object.assign({}, account)
        try {
            updateActiveAccount({ preference: { ...account.preference, [property]: value }})
            await API.Profile.updateAccount(account._id || "", { preference: { [property]: value }})
        }
        catch (error) {
            updateActiveAccount(backup)
            showAPIError(error)
        }
    }, [account])

    const handleBuyNotification = useCallback((value: boolean) => update("receiveBuyNotification", value), [account])
    const handleSellNotification = useCallback((value: boolean) => update("receiveSellNotification", value), [account])
    const handleBalanceNotification = useCallback((value: boolean) => update("receiveBalanceNotification", value), [account])
    const handleAddStockTrackerPaused = useCallback((value: boolean) => update("addStockTrackerPaused", value), [account])

    return {
        input: account.preference,
        handleBuyNotification,
        handleSellNotification,
        handleBalanceNotification,
        handleAddStockTrackerPaused
    }
}