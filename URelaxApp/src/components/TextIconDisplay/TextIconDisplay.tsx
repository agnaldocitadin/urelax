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
        <STextIconDisplayView style={style}>
            <STextIconDisplayIcon size={60} name={icon} color={iconColor}/>
            {title && <STextIconDisplayTitle fontSize={19} color={textColor}>{title}</STextIconDisplayTitle>}
            {message && <STextIconDisplayDesc fontSize={15} color={textColor}>{message}</STextIconDisplayDesc>}
        </STextIconDisplayView>
    )
}

const STextIconDisplayView = styled.View`
    align-items: center;
`

const STextIconDisplayTitle = styled(TypographyMedium)`
    margin-bottom: 20px;
    text-align: center;
`

const STextIconDisplayDesc = styled(Typography)`
    text-align: center;
`

const STextIconDisplayIcon = styled(BaseIcon)`
    margin-bottom: 20px;
`