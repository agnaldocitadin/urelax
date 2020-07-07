import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'

interface WizardViewProps {
    icon: string
    label?: string
    style?: ViewStyle
}

export const WizardView: FC<WizardViewProps> = ({ children, style }) => {
    return (
        <View style={style}>
            { children }
        </View>
    )
}