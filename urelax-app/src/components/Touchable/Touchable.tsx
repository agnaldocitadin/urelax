import React, { FC } from 'react'
import { TouchableNativeFeedback, TouchableNativeFeedbackProps } from 'react-native'
import { Colors } from '../../theming'

export interface TouchableProps extends TouchableNativeFeedbackProps {
    feedbackColor?: string
    disabled?: boolean
    borderless?: boolean
    onPress?(): void
    onPressIn?(): void
    onPressOut?(): void
    onLongPress?(): void
}

export const Touchable: FC<TouchableProps> = ({ 
    children,
    disabled, 
    feedbackColor = Colors.BG_2,
    borderless = true,
    onPress, 
    onPressIn, 
    onPressOut, 
    onLongPress,
    ...others
}) => (
    <TouchableNativeFeedback
        disabled={disabled}
        background={TouchableNativeFeedback.Ripple(feedbackColor, borderless)} 
        onPress={onPress}
        onPressIn={onPressIn}
        onPressOut={onPressOut}
        onLongPress={onLongPress}
        {...others}>
        { children }
    </TouchableNativeFeedback>
)