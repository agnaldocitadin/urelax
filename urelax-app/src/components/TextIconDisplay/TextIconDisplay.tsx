import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { BaseIcon, Colors, Typography, TypographyMedium } from '../../theming'

interface TextIconDisplayProps {
    icon: string
    iconColor?: string
    title?: string
    message?: string
    titleColor?: string
    messageColor?: string
    style?: ViewStyle
}

export const TextIconDisplay: FC<TextIconDisplayProps> = ({ 
    icon, 
    iconColor = Colors.BLACK_2,
    title,
    message,
    titleColor = Colors.BLACK_2,
    messageColor = Colors.GRAY_1,
    style
}) => {
    return (
        <Content style={style}>
            <Icon size={50} name={icon} color={iconColor}/>
            {title && <Title fontSize={18} color={titleColor}>{title}</Title>}
            {message && <Message fontSize={15} color={messageColor}>{message}</Message>}
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
    text-align: justify;
`

const Icon = styled(BaseIcon)`
    margin-bottom: 20px;
`