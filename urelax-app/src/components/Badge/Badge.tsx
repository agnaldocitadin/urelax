import React, { FC } from 'react'
import { TextStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Typography } from '../../theming'

interface BadgeProps {
    text?: string
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
    if (!text) return null
    return (
        <Container>
            <Text style={style} color={color} bgColor={bgColor}>{text}</Text>
        </Container>
    )
}

const Container = styled.View`
    flex-direction: row;
`

const Text = styled(Typography)<{ bgColor: string }>`
    color: ${({ color }) => color};
    background-color: ${({ bgColor }) => bgColor};
    border-radius: 20px;
    padding: 0 10px;
`