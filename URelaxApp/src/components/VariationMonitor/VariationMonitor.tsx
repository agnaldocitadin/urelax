import { utils } from 'js-commons'
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors, Icons, Typography } from '../../theming'

interface VariationMonitorProps {
    value?: number
    fontSize?: number
    textColor?: string
    iconColor?: string
    showIcon?: boolean
}

export const VariationMonitor: FC<VariationMonitorProps> = ({
    value = 0,
    fontSize = 14,
    textColor = Colors.WHITE,
    iconColor = Colors.BLACK_2,
    showIcon
}) => (
    <Display>
        { showIcon && <DisplayIcon 
            name={value === 0 ? Icons.ARROW_RIGHT : (value >= 0 ? Icons.ARROW_UP : Icons.ARROW_DOWN)} 
            size={fontSize} 
            color={iconColor}/> }

        <DisplayValue
            fontSize={fontSize}
            color={textColor}
            bgColor={value === 0 ? Colors.BG_2 : ( value > 0 ? Colors.BLUES_3 : Colors.RED_ERROR )}>
            {utils.formatNumber(value, { showSignal: true })}%
        </DisplayValue>
    </Display>
)

const Display = styled.View`
    flex-direction: row;
    align-items: center;
`

const DisplayIcon = styled(Icon)`
    margin-left: 5px;
`

const DisplayValue = styled(Typography)<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    margin-left: 5px;
    border-radius: 3px;
    padding: 0 5px;
`