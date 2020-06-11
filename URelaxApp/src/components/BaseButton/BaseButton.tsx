import React, { FC } from 'react'
import { TouchableNativeFeedback, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

export interface BaseButtonPros {
    style?: ViewStyle
    contentStyle?: ViewStyle
    feedbackColor?: string
    disabled?: boolean
    onPress?(): void
    onPressIn?(): void
    onPressOut?(): void
    onLongPress?(): void
}

export const BaseButton: FC<BaseButtonPros> = ({ 
    children, 
    style, 
    contentStyle, 
    feedbackColor = "silver",
    disabled,
    onPress,
    onPressIn,
    onPressOut,
    onLongPress
}) => (
    <Button style={style}>
        <TouchableNativeFeedback
            disabled={disabled}
            background={TouchableNativeFeedback.Ripple(feedbackColor, true)} 
            onPress={onPress}
            onPressIn={onPressIn}
            onPressOut={onPressOut}
            onLongPress={onLongPress}>
            <Content style={contentStyle}>
                { children }
            </Content>
        </TouchableNativeFeedback>
    </Button>
)

const Button = styled.View`
    background-color: white;
    justify-content: center;
    height: 50px;
`

const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`