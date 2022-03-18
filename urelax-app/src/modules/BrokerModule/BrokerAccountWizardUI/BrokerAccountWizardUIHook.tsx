import { useNavigation } from "@react-navigation/native"
import { validations } from "js-commons"
import { useCallback, useState } from "react"
import { BrokerAccount, Brokers } from 'urelax-api'
import BrokerModule from ".."
import { InteractiveButtonData, InteractiveButtonStates } from "../../../components/InteractiveButton"
import { ts } from "../../../core/I18n"
import MessagingModule from "../../MessagingModule"
import { Routes } from "../../NavigationModule/const"
import { createBrokerAccount, updateBrokerAccount } from "../api"
import { BrokerAccountWizardViews } from "../const"
import { useBroker } from "../hook"

const sequenceViews = {
    [Brokers.CLEAR]: [
        String(BrokerAccountWizardViews.DESCRIPTION),
        String(BrokerAccountWizardViews.CPF),
        String(BrokerAccountWizardViews.BIRTHDATE),
        String(BrokerAccountWizardViews.SIGNATURE),
        String(BrokerAccountWizardViews.PASSWORD)
    ]
}

const standardViews = [
    String(BrokerAccountWizardViews.REVIEW),
    String(BrokerAccountWizardViews.DONE)
]

export const useBrokerAccountWizardUIHook = () => {

    const navigation = useNavigation()
    const { convertToBrokerAccountInput } = useBroker()
    const { updateSelectedBrokerAccount, addUserBrokerAccounts } = BrokerModule.actions()
    const { showAPIError } = MessagingModule.actions()
    const transient: BrokerAccount = BrokerModule.select("selectedBrokerAccount")
    const edit: boolean = BrokerModule.select("edit")
    const viewToEdit: boolean = BrokerModule.select("viewToEdit")
    const [ btnFormData, setBtnFormData ] = useState<InteractiveButtonData>({ text: ts("next") })

    const handleChangeBirthdate = useCallback((date: Date) => {
        transient.extraData["birthdate"] = date
        updateSelectedBrokerAccount(transient)
    }, [])
    
    const handleChangeCPF = useCallback((cpf: string) => {
        transient.extraData["cpf"] = cpf
        updateSelectedBrokerAccount(transient)
    }, [])

    const handleChangeDescription = useCallback((description: string) => {
        transient["accountName"] = description
        updateSelectedBrokerAccount(transient)
    }, [])
    
    const handleChangePassword = useCallback((password: string) => {
        transient.extraData["password"] = password
        updateSelectedBrokerAccount(transient)
    }, [])
    
    const handleChangeSignature = useCallback((signature: string) => {
        transient.extraData["signature"] = signature
        updateSelectedBrokerAccount(transient)
    }, [])

    const handleDisableButton = useCallback((view: string) => {
        if (String(BrokerAccountWizardViews.DESCRIPTION) === view) {
            return !transient.accountName || transient.accountName.length < 4
        }

        const {
            cpf,
            birthdate,
            signature,
            password
        } = transient.extraData
        
        switch (view) {
            case String(BrokerAccountWizardViews.CPF):
                return !cpf || cpf?.replace(/[^\d]/g, "").length < 11

            case String(BrokerAccountWizardViews.BIRTHDATE):
                return !birthdate

            case String(BrokerAccountWizardViews.PASSWORD):
                return !password || !validations.validatePassword(password)

            case String(BrokerAccountWizardViews.SIGNATURE):
                return !signature || signature.length < 3
                
            default:
                return false
        }
    }, [transient])

    const handleFinish = useCallback(async () => {
        try {
            setBtnFormData(old => ({
                ...old,
                activityState: InteractiveButtonStates.PROCESSING 
            }))
            
            const input = convertToBrokerAccountInput(transient)
            if (edit) {
                await updateBrokerAccount(transient._id, input)
            }
            else {
                const newAccount = await createBrokerAccount(input)
                addUserBrokerAccounts(newAccount)
            }
            setBtnFormData(old => ({
                ...old,
                activityState: InteractiveButtonStates.NORMAL,
                text: ts("done")
            }))
        }
        catch(error) {
            showAPIError(error)
            setBtnFormData(old => ({
                ...old,
                activityState: InteractiveButtonStates.NORMAL
            }))
            throw error
        }
    }, [edit, transient])

    const handleValidation = useCallback(() => {
        return true
    }, [])

    const handleFlowEnded = useCallback(() => {
        edit ? navigation.goBack() : navigation.navigate(Routes.BROKER_ACCOUNTS)
    }, [edit])

    return {
        transient,
        sequence: edit ? [...String(viewToEdit), String(BrokerAccountWizardViews.DONE)] : [...(sequenceViews as any)[transient.brokerCode], ...standardViews],
        expressionDone: edit ? "broker_account_update_success" : "broker_account_add_success",
        messageDone: edit ? "broker_account_update_success_msg" : "broker_account_add_success_msg",
        btnFormData,
        handleFinish,
        handleValidation,
        handleFlowEnded,
        handleChangeBirthdate,
        handleChangeCPF,
        handleChangeDescription,
        handleChangePassword,
        handleChangeSignature,
        handleDisableButton
    }
}