import { BrokerAccount } from "honeybee-api"
import { useCallback, useState } from "react"

export const useBrokerAccountWizardUIHook = () => {

    const [ loading, setLoading ] = useState(false)
    const transient: BrokerAccount = {} as BrokerAccount

    const handleChangeBirthdate = useCallback((date: Date) => {

    }, [])

    const handleChangeCPF = useCallback((cpf: string) => {

    }, [])

    const handleChangeDescription = useCallback((description: string) => {

    }, [])

    const handleChangePassword = useCallback((password: string) => {

    }, [])

    const handleChangeConfirmPassword = useCallback((password: string) => {

    }, [])

    const handleChangeSignature = useCallback((signature: string) => {

    }, [])

    const handleFinish = useCallback(async () => {

    }, [])

    const handleValidation = useCallback(() => {
        return true
    }, [])

    const handleFlowEnded = useCallback(() => {

    }, [])

    return {
        transient,
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