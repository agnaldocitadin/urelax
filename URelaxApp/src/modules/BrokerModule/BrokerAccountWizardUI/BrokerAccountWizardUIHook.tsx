import { useNavigation } from "@react-navigation/native"
import { BrokerAccount, Brokers } from "honeybee-api"
import { useCallback, useState } from "react"
import BrokerModule from ".."
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
    const [ loading, setLoading ] = useState(false)
    const { convertToBrokerAccountInput } = useBroker()
    const { updateSelectedBrokerAccount } = BrokerModule.actions()
    const { showAPIError } = MessagingModule.actions()
    const transient: BrokerAccount = BrokerModule.select("selectedBrokerAccount")
    const edit: boolean = BrokerModule.select("edit")
    const viewToEdit: boolean = BrokerModule.select("viewToEdit")
    const [ passwordConfirm, setPasswordConfirm ] = useState("")

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
    
    const handleChangeConfirmPassword = useCallback((password: string) => {
        setPasswordConfirm(password)
    }, [passwordConfirm])
    
    const handleChangeSignature = useCallback((signature: string) => {
        transient.extraData["signature"] = signature
        updateSelectedBrokerAccount(transient)
    }, [])

    const handleFinish = useCallback(async () => {
        console.log("trans", transient)
        try {
            const input = convertToBrokerAccountInput(transient)
            console.log("input", input)
            if (edit) {
                await updateBrokerAccount(transient._id, input)
            }
            else {
                const newAccount = await createBrokerAccount(input)
            }
        }
        catch(error) {
            showAPIError(error)
            throw error
        }
    }, [edit, transient])

    const handleValidation = useCallback(() => {
        return true
    }, [])

    const handleFlowEnded = useCallback(() => {
        edit ? navigation.goBack() : navigation.navigate(Routes.ADD_BROKER_ACCOUNT)
    }, [edit])

    return {
        transient,
        sequence: edit ? [...String(viewToEdit), String(BrokerAccountWizardViews.DONE)] : [...(sequenceViews as any)[transient.brokerCode], ...standardViews],
        messageDone: "ds",
        loading,
        passwordConfirm,
        handleFinish,
        handleValidation,
        handleFlowEnded,
        handleChangeBirthdate,
        handleChangeCPF,
        handleChangeDescription,
        handleChangePassword,
        handleChangeSignature,
        handleChangeConfirmPassword
    }
}