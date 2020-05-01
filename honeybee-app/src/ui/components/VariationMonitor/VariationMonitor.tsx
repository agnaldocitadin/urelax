
import { utils } from 'js-commons'
import { Icon, Text, View } from 'native-base'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors, Icons, Theme } from '../../../core/Theme'

interface VariationMonitorProps {
    value?: number
    fontSize?: number
    textColor?: string
    iconColor?: string
}

export const VariationMonitor: FC<VariationMonitorProps> = ({
    value = 0,
    fontSize = 14,
    textColor = Colors.WHITE,
    iconColor = Colors.BLACK_2
}) => (
    <Display>
        <DisplayIcon 
            type={Theme.ICON_PACK} 
            name={value === 0 ? Icons.ARROW_RIGHT : (value >= 0 ? Icons.ARROW_UP : Icons.ARROW_DOWN)} 
            fontSize={fontSize} 
            color={iconColor}/>

        <DisplayValue
            fontSize={fontSize}
            color={textColor}
            bgColor={value === 0 ? Colors.BG_2 : ( value > 0 ? Colors.BLUES_3 : Colors.RED_ERROR )}>
            {utils.formatNumber(value, { showSignal: true })}%
        </DisplayValue>
    </Display>
)

const Display = styled(View)`
    flex-direction: row;
    align-items: center;
`

const DisplayIcon: any = styled(Icon)`
    font-family: ${Theme.FONT_REGULAR};
    font-size: ${(props: any) => `${props.fontSize}px`};
    color: ${(props: any) => props.color};
    margin-left: 5px;
`

const DisplayValue: any = styled(Text)`
    font-size: ${(props: any) => `${props.fontSize}px`};
    color: ${(props: any) => props.color};
    background-color: ${(props: any) => props.bgColor};
    margin-left: 5px;
    border-radius: 3px;
    padding: 0 5px;
`