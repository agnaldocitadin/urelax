import React, { FC } from "react"
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from "styled-components/native"
import { Colors } from "../../theming"

export enum WizardState {
    NOT_SELECTED,
    SELECTED,
    REACHED
}

interface WizardIconProps {
    icon: string
    state: WizardState
    primaryColor?: string
    secondColor?: string
    thirdColor?: string
}

export const WizardIcon: FC<WizardIconProps> = ({ 
    icon,
    state,
    primaryColor = Colors.BLUES_1,
    secondColor = Colors.WHITE,
    thirdColor = Colors.BG_4
}) => {

    let contentColor
    let iconColor
    let bgIcon
    

    switch(state) {
        case WizardState.NOT_SELECTED:
            contentColor = thirdColor
            iconColor = thirdColor
            bgIcon = secondColor
            break
        
        case WizardState.SELECTED:
            contentColor = primaryColor
            iconColor = secondColor
            bgIcon = primaryColor
            break

        case WizardState.REACHED:
            contentColor = primaryColor
            iconColor = thirdColor
            bgIcon = secondColor
            break
    }

    return (
        <Content color={contentColor}>
            <ContentIcon 
                iconColor={iconColor}
                bgColor={bgIcon}
                name={icon}
                size={16}/>
        </Content>
    )
}

const Content = styled.View<{ color: string }>`
    background-color: ${({ color}) => color};
    border-color: ${({ color}) => color};
    border-radius: 30px;
    padding: 3px;
`

const ContentIcon = styled(Icon)<{ iconColor: string, bgColor: string }>`
    color: ${({ iconColor }) => iconColor};
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 25px;
    padding: 8px;
`