import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { BaseIcon, Colors, Typography, TypographyMedium } from '../../theming'

interface TextIconDisplayProps {
    icon: string
    iconColor?: string
    title?: string
    message?: string
    textColor?: string
    style?: ViewStyle
}

export const TextIconDisplay: FC<TextIconDisplayProps> = ({ 
    icon, 
    iconColor = Colors.BLACK_2,
    title,
    message,
    textColor = Colors.BLACK_2,
    style
}) => {
    return (
        <Content style={style}>
            <Icon size={50} name={icon} color={iconColor}/>
            {title && <Title fontSize={17} color={textColor}>{title}</Title>}
            {message && <Message fontSize={14} color={textColor}>{message}</Message>}
        </Content>
    )
}

const Content = styled.View`
    align-items: center;
`

const Title = styled(TypographyMedium)`
    margin-bottom: 20px;
    text-align: center;
`

const Message = styled(Typography)`
    text-align: center;
`

const Icon = styled(BaseIcon)`
    margin-bottom: 20px;
`