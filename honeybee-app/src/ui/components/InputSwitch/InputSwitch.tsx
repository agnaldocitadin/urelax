import { NativeBase, Switch, Text, View } from 'native-base'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components'
import { Colors, Theme } from '../../../core/Theme'

interface InputSwitchProps extends NativeBase.Switch {
    text: string
    labelColor?: string
    fontSize?: number
    value?: boolean
    style?: ViewStyle
    onChange?(value: boolean): void
}

export const InputSwitch: FC<InputSwitchProps> = ({ 
    value,
    text,
    labelColor = Colors.GRAY_2,
    thumbColor = Colors.BLUES_2,
    fontSize = 15,
    style,
    onChange,
    ...others
}) => {

    return (
        <SwitchView style={style} onTouchStart={() => onChange && onChange(!value)}>
            <SwitchLabel fontSize={fontSize} color={labelColor}>{text}</SwitchLabel>
            <Switch 
                {...others}
                thumbColor={thumbColor}
                value={value}/>
        </SwitchView>
    )
}

const SwitchView: any = styled(View)`
    justify-content: space-between;
    flex-direction: row;
    width: 100%;
`

const SwitchLabel: any = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    font-size: ${(props: any) => `${props.fontSize}px`};
    color: ${(props: any) => props.color};
`