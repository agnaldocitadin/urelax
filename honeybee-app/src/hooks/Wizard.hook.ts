import { useCallback, useState } from "react"
import { NavigationStackProp } from "react-navigation-stack"
import { BROKER_FLOW_VIEW } from "../modules/broker"
import { animatedCallback } from "./Commons.hook"

export interface WizardExecution {
    navigation: NavigationStackProp
    flow: string[]
    currentView: string
    onRequestEdit: (value: any) => any
    onRequestPersist: (value: any) => any
    onRequestFail?: (error: any) => any
    isEditing: boolean
}

export const useWizardHook = ({ navigation, flow, currentView, isEditing, onRequestEdit, onRequestPersist, onRequestFail }: WizardExecution, ...args: any[]) => {

    const [ selectedValue, setSelectedValue ] = useState()

    const handleButtonPress = animatedCallback(async () => {
        try {
            if (isEditing) {
                await onRequestEdit(selectedValue)
                navigation.navigate(flow[0])
            }
            else {
                await onRequestPersist(selectedValue)
                handleNext()
            }
        }
        catch(e) {
            onRequestFail && onRequestFail(e)
        }
    }, [selectedValue, ...args])

    const handleNext = useCallback((viewIdx?: number) => {
        if (viewIdx !== undefined) {
            navigation.navigate(flow[viewIdx], { [BROKER_FLOW_VIEW]: flow })
            return
        }

        let idx = flow.indexOf(currentView)
        let nextView
        if (idx < 0) throw new Error(`View ${currentView} wasn't found on the current stack.`)
        if (idx === flow.length - 1) {
            return
        }
        nextView = flow[idx + 1]
        navigation.navigate(nextView, { [BROKER_FLOW_VIEW]: flow })
    }, [])

    const handleValueChanges = (value: any, raw?: any) => setSelectedValue(raw !== undefined ? raw : value)

    return {
        selectedValue,
        handleButtonPress,
        handleValueChanges
    }
}