import React, { FC } from 'react'
import { TextStyle } from 'react-native'
import styled from 'styled-components'
import { Colors, Typography } from '../../theming'

interface BadgeProps {
    text: string
    color?: string
    bgColor?: string
    style?: TextStyle
}

export const Badge: FC<BadgeProps> = ({
    bgColor = Colors.BG_2,
    color = Colors.WHITE, 
    style,
    text
}) => {
    return <Text style={style} color={color} bgColor={bgColor}>{text}</Text>
}

const Text = styled(Typography)<{ bgColor: string }>`
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 20px;
    padding: 0 10px;
    margin-right: 5px; 
`