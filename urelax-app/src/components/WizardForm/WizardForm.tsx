import React, { FC, useState } from "react"
import { ViewStyle } from "react-native"
import styled from "styled-components/native"
import { animatedCallback } from '../../core/Commons.hook'
import { ts } from '../../core/I18n'
import { Colors, DEFAULT_VERTICAL_SPACING } from "../../theming"
import { InteractiveButton, InteractiveButtonData } from "../InteractiveButton"
import { Wizard, WizardProps } from "../Wizard"

interface WizardFormProps {
    views: WizardProps["views"]
    sequence: WizardProps["sequence"]
    style?: ViewStyle
    nextButtonData?: InteractiveButtonData
    previousButtonData?: InteractiveButtonData
    finishViewName: string
    onValidate(index: number): boolean
    onFinish(): Promise<void>
    onFlowEnded?(): void
    isButtonDisabled(view: string): boolean
}

export const WizardForm: FC<WizardFormProps> = ({ 
    nextButtonData = {
        text: ts("next"),
        textColor: Colors.BLUES_3,
    },
    previousButtonData = {
        text: ts("previous"),
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
    const showPreviousBtn = index > 0 && others.sequence[index] !== finishViewName

    const handlePrevious = animatedCallback(() => setIndex(old => (old - 1)))

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

    return (
        <React.Fragment>
            <WizardFlow {...others} index={index}/>
            <ButtonContent>
                { showPreviousBtn && <PreviousButton data={previousButtonData} onPress={handlePrevious}/> }
                <NextButton disabled={disabled} data={nextButtonData} onPress={handleNext}/>
            </ButtonContent>
        </React.Fragment>
    )
}

const WizardFlow = styled(Wizard)`
    margin-top: ${DEFAULT_VERTICAL_SPACING}px;
`
const ButtonContent = styled.View`
    flex-direction: row;
`

const NextButton = styled(InteractiveButton)`
    background-color: ${Colors.WHITE};
    border-top-width: 1px;
    border-color: ${Colors.BG_1};
    flex: 1;
`

const PreviousButton = styled(NextButton)`
    border-right-width: 1px;
`