import React, { FC, ReactElement } from 'react'
import { GestureResponderEvent, TextStyle, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { BaseIcon, Colors, Typography } from '../../../theming'

export interface InputWrapperProps {
    label?: string
    labelStyle?: TextStyle
    wrapperStyle?: ViewStyle
    leftIcon?: string
    leftIconSize?: number
    leftIconColor?: string
    rightIcon?: string
    rightIconSize?: number
    rightIconColor?: string
    disabled?: boolean
    rightIconAction?(): void
    onTouchStart?(event: GestureResponderEvent): void
    wrapped?: ReactElement
}

const DEFAULT_ICON_SIZE = 20

export const InputWrapper: FC<InputWrapperProps> = ({
    label,
    labelStyle,
    wrapperStyle,
    leftIcon,
    leftIconSize = DEFAULT_ICON_SIZE,
    leftIconColor,
    rightIcon,
    rightIconSize = DEFAULT_ICON_SIZE,
    rightIconColor,
    rightIconAction,
    onTouchStart,
    wrapped,
    ...others
}) => {
    return (
        <Container 
            onTouchStart={onTouchStart}
            style={wrapperStyle}>
            { label && <Typography style={labelStyle}>{label}</Typography> }
            <Content>
                { leftIcon && <SIcon name={leftIcon} size={leftIconSize} color={leftIconColor}/> }
                { wrapped }
                { rightIcon && 
                    <SIcon 
                        name={rightIcon} 
                        size={rightIconSize} 
                        color={rightIconColor} 
                        paddingLeft={10}
                        onPress={rightIconAction}/>
                }
            </Content>
        </Container>
    )
}

const Container = styled.View`
    border-color: ${Colors.GRAY_1};
    border-width: 1px;
    border-radius: 5px;
    padding: 5px 15px;
`

const Content = styled.View`
    flex-direction: row;
    align-items: center;
`

const SIcon = styled(BaseIcon)<{ paddingLeft?: number }>`
    padding-left: ${({ paddingLeft }) => `${paddingLeft || 0}px`};
`