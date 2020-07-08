import React, { FC } from "react"
import styled from "styled-components/native"
import { Colors, DEFAULT_VERTICAL_SPACING } from "../../theming"
import { InteractiveButton, InteractiveButtonData } from "../InteractiveButton"
import { Wizard, WizardProps } from "../Wizard"

interface WizardFormProps extends WizardProps {
    buttonData?: InteractiveButtonData
    onButtonPress?(): void
}

export const WizardForm: FC<WizardFormProps> = ({ 
    children,
    buttonData = {
        text: "Next",
        textColor: Colors.BLUES_2
    },
    onButtonPress,
    ...others
}) => {
    return (
        <React.Fragment>
            <WizardFlow {...others}>
                { children }
            </WizardFlow>
            <Button data={buttonData} onPress={onButtonPress}/>
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