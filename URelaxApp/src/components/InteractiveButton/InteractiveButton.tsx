import React, { FC } from 'react'
import { ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors, TypographyMedium } from '../../theming'
import { BaseButton, BaseButtonPros } from '../BaseButton'

export enum InteractiveButtonStates {
    NORMAL,
    PROCESSING,
    SUCCESS
}

export interface InteractiveButtonData {
    text?: string
    activityState?: InteractiveButtonStates
    textColor?: string
    disabledTextColor?: string
    disabled?: boolean
    icon?: string
    iconColor?: string
    iconSize?: number
}

export interface InteractiveButtonProps extends BaseButtonPros {
    data: InteractiveButtonData
    indicatorColor?: string
}

export const InteractiveButton: FC<InteractiveButtonProps> = ({ 
    data,
    indicatorColor = Colors.BLACK_2,
    ...others
}) => {

    const {
        text,
        activityState = InteractiveButtonStates.NORMAL,
        textColor = Colors.BLACK_2,
        disabledTextColor = Colors.WHITE,
        disabled,
        icon,
        iconColor = Colors.BLACK_2,
        iconSize = 30,
    } = data
    
    let _text
    let _disabled
    if (activityState === InteractiveButtonStates.NORMAL) {
        _disabled = disabled
        _text = text
    }

    if (activityState === InteractiveButtonStates.PROCESSING) {
        _disabled = true
        _text = undefined
    }

    if (activityState === InteractiveButtonStates.SUCCESS) {
        _disabled = disabled
        _text = text
    }

    return (
        <BaseButton {...others} disabled={_disabled}>
            { (activityState === InteractiveButtonStates.PROCESSING) && <SActivityIndicator size="large" color={indicatorColor}/> }
            { (activityState === InteractiveButtonStates.SUCCESS) && <StyledIcon color={iconColor} size={iconSize} name="check-circle"/> }
            { _text && <StyledText color={_disabled ? disabledTextColor : textColor} fontSize={13}>{text}</StyledText> }
            { (activityState === InteractiveButtonStates.NORMAL && icon) && <StyledIcon color={iconColor} size={iconSize} name={icon}/>}
        </BaseButton>
    )
}

const StyledIcon = styled(Icon)`
    margin-right: auto;
    margin-left: auto;
    margin: 0;
`

const StyledText = styled(TypographyMedium)`
    text-transform: uppercase;
    text-align: center;
`

const SActivityIndicator: any = styled(ActivityIndicator)`
    margin-left: auto;
    margin-right: auto;
`