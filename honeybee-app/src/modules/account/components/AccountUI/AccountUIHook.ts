import { validations } from 'js-commons'
import { useCallback, useState } from "react"
import { Keyboard } from "react-native"
import { useDispatch, useSelector } from "react-redux"
import { animatedPromise, useEffectWhenReady } from "../../../../globals/Utils"
import { States } from "../../../../reducers/Reducer"
import { showConfirm, showError, showSuccess } from "../../../message"
import { registerAuthenticatedUser } from "../../../signIn"
import { updateDataApp } from "../../../storage"
import { changeAccountData, resetAccountModule, selectAccountToUpdate } from "../../actions"
import { updateUserAccount } from "../../api"

export const useAccountUIHook = () => {

    const dispatch = useDispatch()
    const account = useSelector((state: States) => state.SIGNIN.authenticatedUser)
    const accountToUpdate = useSelector((state: States) => state.ACCOUNT.accountToUpdate)
    const [ passwordConfirm, setPasswordConfirm ] = useState("")

    const handleFullnameChanges = useCallback((chars: string) => dispatch(changeAccountData({ name: chars })), [])

    const handleEmailChanges = useCallback((chars: string) => dispatch(changeAccountData({ email: chars })), [])

    const handlePasswdChanges = useCallback((chars: string) => dispatch(changeAccountData({ passwd: chars })), [])

    const handleNicknameChanges = useCallback((chars: string) => dispatch(changeAccountData({ nickname: chars })), [])

    const handlePasswordConfirmChanges = useCallback((chars: string) => setPasswordConfirm(chars), [])

    const validName = validations.validateFullName(accountToUpdate?.name)

    const validNickname = validations.validateNickname(accountToUpdate?.nickname)
    
    const validEmail = validations.validateEmail(accountToUpdate?.email)
    
    const validPassword = validations.validatePassword(accountToUpdate?.passwd)
    
    const validConfirmPassword = accountToUpdate?.passwd === passwordConfirm

    const handleSaveAccount = () => animatedPromise(async () => {
        Keyboard.dismiss()
        dispatch(showConfirm(ts("account_update"), ts("account_update_msg"), async () => {
            try {
                await updateUserAccount(accountToUpdate?._id, accountToUpdate)
                dispatch(registerAuthenticatedUser(accountToUpdate || {}))
                await updateDataApp({
                    email: accountToUpdate?.email, 
                    passwd: accountToUpdate?.passwd 
                })
                dispatch(showSuccess(ts("account_update_success"), ts("account_update_success_msg")))
            }
            catch(e) {
                dispatch(showError(JSON.stringify(e)))
            }
        }, false))
    })

    useEffectWhenReady(() => {
        setPasswordConfirm(account?.passwd || "")
        dispatch(selectAccountToUpdate(account))
    }, () => dispatch(resetAccountModule()))

    return {
        passwordConfirm,
        account: accountToUpdate,
        validName,
        validNickname,
        validEmail,
        validPassword,
        validConfirmPassword,
        validForm: validName && validNickname && validEmail && validPassword && validConfirmPassword,
        disabledForm: account.simulation,
        handleFullnameChanges,
        handleEmailChanges,
        handleNicknameChanges,
        handlePasswdChanges,
        handleSaveAccount,
        handlePasswordConfirmChanges
    }
}