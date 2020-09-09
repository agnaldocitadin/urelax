import { useBackHandler } from '@react-native-community/hooks'
import React, { FC, useState } from "react"
import { ViewStyle } from "react-native"
import styled from "styled-components/native"
import { animatedCallback } from '../../core/Commons.hook'
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
    isButtonDisabled(view: string): boolean
}

export const WizardForm: FC<WizardFormProps> = ({ 
    buttonData = {
        text: "Next",
        textColor: Colors.BLUES_3,
    },
    finishViewName,
    onFinish,
    onValidate,
    onFlowEnded,
    isButtonDisabled,
    ...others
}) => {

    const [ index, setIndex ] = useState(0)
    const disabled = isButtonDisabled(others.sequence[index]) ?? true

    const handleNext = animatedCallback(async () => {
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
            <Button disabled={disabled} data={buttonData} onPress={handleNext}/>
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