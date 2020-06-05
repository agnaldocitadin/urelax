import React, { FC, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors, TypographyMedium } from '../../theming'
import { BaseButton } from '../BaseButton'

export enum InteractiveButtonStates {
    NORMAL,
    PROCESSING,
    SUCCESS
}

export interface InteractiveButtonProps {
    normalText?: string
    processingText?: string
    successText?: string
    successStatus?: InteractiveButtonStates
    normalBgColor?: string
    processingBgColor?: string
    successBgColor?: string
    disabledBgColor?: string
    disabledTextColor?: string
    textColor?: string
    disabled?: boolean
    block?: boolean
    transparent?: boolean
    radius?: number
    borderWidth?: number
    borderColor?: string
    width?: string
    // height?: number
    icon?: string
    iconColor?: string
    iconSize?: number
    staticState?: boolean
    indicatorColor?: string
    animate?: boolean
    onPress?(): Promise<void|unknown>
}

export const InteractiveButton: FC<InteractiveButtonProps> = ({ 
    normalText,
    processingText,
    successText,
    successStatus = InteractiveButtonStates.SUCCESS,
    normalBgColor = Colors.WHITE,
    processingBgColor = Colors.WHITE,
    successBgColor = Colors.GREEN_SUCCESS,
    disabledBgColor = Colors.BG_2,
    disabledTextColor = Colors.WHITE,
    textColor = Colors.BLACK_2,
    onPress,
    disabled,
    block,
    // transparent,
    radius = 0,
    borderWidth = 0,
    borderColor = Colors.GRAY_3,
    width = "auto",
    // height = 55,
    icon,
    iconColor = Colors.BLACK_2,
    iconSize = 30,
    staticState,
    animate = true,
    indicatorColor = Colors.BLACK_2
}) => {

    const [ activityState, setActivityState ] = useState(InteractiveButtonStates.NORMAL)

    const handleOnPress = () => {
        if (!disabled && onPress) {
            if (animate && !staticState) {
                setActivityState(InteractiveButtonStates.PROCESSING)
            }
            
            onPress()
                .then(() => {
                    if (animate && !staticState) {
                        setActivityState(successStatus)
                    }
                })
                .catch(() => {
                    if (animate && !staticState) {
                        setActivityState(InteractiveButtonStates.NORMAL)
                    }
                })
        }
    }
    
    let text
    let bgColor
    let disable
    let disableBgColor
    if (activityState === InteractiveButtonStates.NORMAL) {
        text = normalText
        bgColor = normalBgColor
        disableBgColor = disabledBgColor
        disable = disabled
    }

    if (activityState === InteractiveButtonStates.PROCESSING) {
        text = processingText
        bgColor = processingBgColor
        disableBgColor = bgColor
        disable = true
    }

    if (activityState === InteractiveButtonStates.SUCCESS) {
        text = successText
        bgColor = successBgColor
        disableBgColor = disabledBgColor
        disable = true
    }

    return (
        <SButtonNormal
            bgColor={bgColor}
            radius={radius}
            borderWidth={borderWidth}
            borderColor={borderColor}
            block={block} 
            onPress={handleOnPress} 
            disabled={disable}
            disabledBgColor={disableBgColor}
            width={width}
            // height={height}
            >
            { (activityState === InteractiveButtonStates.PROCESSING) && <SActivityIndicator size="large" color={indicatorColor}/> }
            { (activityState === InteractiveButtonStates.SUCCESS) && <StyledIcon color={iconColor} size={iconSize} name="check-circle"/> }
            { text && <StyledText block={block} color={disable ? disabledTextColor : textColor} fontSize={13}>{text}</StyledText> }
            { (activityState === InteractiveButtonStates.NORMAL && icon) && <StyledIcon color={iconColor} size={iconSize} name={icon}/>}
        </SButtonNormal>
    )
}

type ButtonProps = {
    disabled?: boolean
    disabledBgColor?: string
    bgColor?: string
    radius?: number
    block?: boolean
    width?: string
    borderWidth?: number
    borderColor?: string
}

const SButtonNormal = styled(BaseButton)<ButtonProps>`
    background-color: ${({ disabled, disabledBgColor, bgColor }) => disabled ? disabledBgColor : bgColor};
    border-radius: ${({ radius }) => `${radius}px`};
    width: ${({ block, width }) => block ? "auto" : width};
    border-width: ${({ borderWidth}) => `${borderWidth}px`};
    border-color: ${({ borderColor}) => borderColor};
`

const StyledIcon = styled(Icon)`
    margin-right: auto;
    margin-left: auto;
    margin: 0;
`

const StyledText = styled(TypographyMedium)<{ block?: boolean }>`
    text-transform: uppercase;
    text-align: center;
    width: ${({ block }) => block ? "100%" : "auto"};
`

const SActivityIndicator: any = styled(ActivityIndicator)`
    margin-left: auto;
    margin-right: auto;
`