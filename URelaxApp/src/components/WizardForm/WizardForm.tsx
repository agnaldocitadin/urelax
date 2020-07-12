import { useBackHandler } from '@react-native-community/hooks'
import React, { FC, useCallback, useState } from "react"
import { ViewStyle } from "react-native"
import styled from "styled-components/native"
import { Colors, DEFAULT_VERTICAL_SPACING } from "../../theming"
import { InteractiveButton, InteractiveButtonData } from "../InteractiveButton"
import { Wizard, WizardProps } from "../Wizard"

interface WizardFormProps {
    views: WizardProps["views"]
    sequence: WizardProps["sequence"]
    style?: ViewStyle
    buttonData?: InteractiveButtonData
    finishViewName: string
    onValidate(index: number): boolean
    onFinish(): Promise<void>
    onFlowEnded?(): void
}

export const WizardForm: FC<WizardFormProps> = ({ 
    buttonData = {
        text: "Next",
        textColor: Colors.BLUES_2
    },
    finishViewName,
    onFinish,
    onValidate,
    onFlowEnded,
    ...others
}) => {

    const [ index, setIndex ] = useState(0)

    const handleNext = useCallback(async () => {
        if (others.sequence[index] === finishViewName) {
            onFlowEnded && onFlowEnded()
            return
        }
        if (onValidate(index)) {
            try {
                others.sequence[index + 1] === finishViewName && await onFinish()
                setIndex(old => (old + 1))
            }
            catch(error) {
                console.log(error)
            }
        }
    }, [others.sequence, index, finishViewName])

    useBackHandler(() => {
        if (index !== 0) {
            setIndex(old => (old - 1))
            return true
        }
        return false
    })

    return (
        <React.Fragment>
            <WizardFlow {...others} index={index}/>
            <Button data={buttonData} onPress={handleNext}/>
        </React.Fragment>
    )
}

const WizardFlow = styled(Wizard)`
    margin-top: ${DEFAULT_VERTICAL_SPACING}px;
`

const Button = styled(InteractiveButton)`
    border-top-width: 1px;
    border-color: ${Colors.BG_1};
`