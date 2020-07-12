import React, { FC } from 'react'
import { Switch, SwitchProps, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Typography } from '../../../theming'

interface InputSwitchProps extends SwitchProps {
    label: string
    labelColor?: string
    fontSize?: number
    value?: boolean
    style?: ViewStyle
    onChange?(value: boolean): void
}

export const InputSwitch: FC<InputSwitchProps> = ({ 
    value,
    label,
    labelColor = Colors.GRAY_2,
    fontSize = 15,
    style,
    onChange,
    ...others
}) => {

    return (
        <SwitchView style={style} onTouchStart={() => onChange && onChange(!value)}>
            <Typography fontSize={fontSize} color={labelColor}>{label}</Typography>
            <Switch {...others} value={value}/>
        </SwitchView>
    )
}

const SwitchView = styled.View`
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`