import React, { FC, useCallback } from 'react'
import { TextStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'

interface InputRadioProps {
    value: any
    checked?: boolean
    color?: string
    checkedColor?: string
    size?: number
    style?: TextStyle
    onPress?(value: any): void
}

export const InputRadio: FC<InputRadioProps> = ({ 
    value, 
    checked, 
    color = "black",
    checkedColor = "black",
    size = 23,
    style,
    onPress 
}) => {
    const handlePress = useCallback(() => onPress && onPress(value), [value])
    return <Check 
        name={checked ? "radiobox-marked" : "radiobox-blank"} 
        onPress={handlePress}
        style={style}
        color={checked ? checkedColor : color}
        size={size}/>
}

const Check = styled(Icon)<{ size: number }>`
    width: ${({ size }) => `${size}px`};
`