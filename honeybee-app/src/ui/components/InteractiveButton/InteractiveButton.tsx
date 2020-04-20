import { Button, Icon, Text } from 'native-base'
import React, { FC, useState } from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components'
import { Colors, Theme } from '../../../core/Theme'

export enum InteractiveButtonStates {
    NORMAL = "normal",
    PROCESSING = "processing",
    SUCCESS = "success"
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
    width?: number
    height?: number
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
    transparent,
    radius = 0,
    borderWidth = 0,
    borderColor = Colors.GRAY_3,
    width = "auto",
    height = 55,
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
            transparent={transparent} 
            block={block} 
            onPress={handleOnPress} 
            disabled={disable}
            disabledBgColor={disableBgColor}
            width={width}
            height={height}>
            { (activityState === InteractiveButtonStates.PROCESSING) && <SActivityIndicator size="large" color={indicatorColor}/> }
            { (activityState === InteractiveButtonStates.SUCCESS) && <StyledIcon color={iconColor} fontSize={iconSize} type={Theme.ICON_PACK} name="check-circle"/> }
            { text && <StyledText block={block} color={textColor} disabledTextColor={disabledTextColor} disabled={disable}>{text}</StyledText> }
            { (activityState === InteractiveButtonStates.NORMAL) && <StyledIcon color={iconColor} fontSize={iconSize} type={Theme.ICON_PACK} name={icon}/>}
        </SButtonNormal>
    )
}

const SButtonNormal: any = styled(Button)`
    background-color: ${(props: any) => props.disabled ? props.disabledBgColor : props.bgColor};
    border-radius: ${(props: any) => `${props.radius}px`};
    width: ${(props: any) => props.block ? "auto" : `${props.width}px`};
    border-width: ${(props: any) => `${props.borderWidth}px`};
    border-color: ${(props: any) => props.borderColor};
    elevation: 0;
`

const StyledIcon: any = styled(Icon)`
    margin: 0;
    margin-left: auto;
    margin-right: auto;
    color: ${(props: any) => props.color};
    font-size: ${(props: any) => `${props.fontSize}px`};
`

const StyledText: any = styled(Text)`
    text-transform: uppercase;
    color: ${(props: any) => props.disabled ? props.disabledTextColor : props.color};
    font-family: ${Theme.FONT_MEDIUM};
    font-size: 13px;
    text-align: center;
    width: ${(props: any) => props.block ? "100%" : "auto"};
`

const SActivityIndicator: any = styled(ActivityIndicator)`
    margin-left: auto;
    margin-right: auto;
`