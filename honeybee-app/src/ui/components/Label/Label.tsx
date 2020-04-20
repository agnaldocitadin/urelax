import { Label } from 'native-base'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors, Theme } from '../../../core/Theme'

export interface LabelProps {
    label?: string
    labelColor?: string
    fontSize?: number
}

export const InputLabel: FC<LabelProps> = ({ 
    label,
    labelColor = Colors.BLACK_2,
    fontSize = 13
}) => {
    if (!label) return null
    return (
        <SLabel 
            fontSize={fontSize}
            color={labelColor}>
            {label}
        </SLabel>
    )
}

const SLabel: any = styled(Label)`
    font-size: ${(props: any) => `${props.fontSize}px`};
    font-family: ${Theme.FONT_REGULAR};
    color: ${(props: any) => props.color};
    margin-top: 5px;
`