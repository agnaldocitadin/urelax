
import { Icon, Text, View } from 'native-base'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components'
import { Colors, Theme } from '../../../core/Theme'

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
            <STextIconDisplayIcon type={Theme.ICON_PACK} name={icon} color={iconColor}/>
            {title && <STextIconDisplayTitle color={textColor}>{title}</STextIconDisplayTitle>}
            {message && <STextIconDisplayDesc color={textColor}>{message}</STextIconDisplayDesc>}
        </STextIconDisplayView>
    )
}

const STextIconDisplayView = styled(View)`
    align-items: center;
`

const STextIconDisplayTitle: any = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${(props: any) => props.color};
    font-size: 19px;
    margin-bottom: 20px;
    text-align: center;
`

const STextIconDisplayDesc: any = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    color: ${Colors.GRAY_2};
    font-size: 15px;
    text-align: center;
`

const STextIconDisplayIcon = styled(Icon)`
    color: ${(props: any) => props.color};
    font-size: 60px;
    margin-bottom: 20px;
`