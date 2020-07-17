import { useNavigation } from "@react-navigation/native"
import { BrokerAccount, Brokers } from "honeybee-api"
import { useCallback, useState } from "react"
import BrokerModule from ".."
import MessagingModule from "../../MessagingModule"
import { Routes } from "../../NavigationModule/const"
import { createBrokerAccount } from "../api"
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
        
    }, [])
    
    const handleChangeSignature = useCallback((signature: string) => {
        transient.extraData["signature"] = signature
        updateSelectedBrokerAccount(transient)
    }, [])

    const handleFinish = useCallback(async () => {
        try {
            const input = convertToBrokerAccountInput(transient)
            const newAccount = await createBrokerAccount(input)
        }
        catch(error) {
            showAPIError(error)
            throw error
        }
    }, [])

    const handleValidation = useCallback(() => {
        return true
    }, [])

    const handleFlowEnded = useCallback(() => {
        navigation.navigate(Routes.ADD_BROKER_ACCOUNT)
    }, [])

    return {
        transient,
        sequence: [...(sequenceViews as any)[transient.brokerCode], ...standardViews],
        messageDone: "ds",
        loading,
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