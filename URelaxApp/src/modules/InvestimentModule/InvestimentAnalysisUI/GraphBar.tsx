
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Colors, Typography } from '../../../theming'

interface GraphBarPros {
    index: number
    value: number
    mainLabel: string
    label?: string
    color: string
    selected?: boolean
    onPress?(index: number): void
}

export const GraphBar: FC<GraphBarPros> = ({ value, mainLabel, label, color, onPress, index, selected }) => {
    return (
        <Container onTouchEnd={() => onPress && onPress(index)}>
            <Bar>
                <BarInter
                    value={value}
                    color={color}
                    selected={selected}/>
            </Bar>
            <Label>
                <Typography
                    color={selected ? Colors.BLACK_1 : Colors.GRAY_3}
                    fontSize={11}
                    textAlign="center">
                    {mainLabel}
                </Typography>
                { label && <Typography
                    color={selected ? Colors.BLACK_1 : Colors.GRAY_3}
                    textAlign="center">
                    {label}
                </Typography> }
            </Label>
        </Container>
    )
}

const Container = styled.View`
    align-items: center;
    padding: 10px 0;
    width: 80px;
`

const Bar = styled.View`
    justify-content: flex-end;
    align-items: center;
    width: 100%;
    flex: 1;
`
const BarInter = styled.View<{ value: number, color: string, selected?: boolean }>`
    background-color: ${Colors.GRAY_4};
    border-top-width: 3px;
    border-color: ${({ color, selected }) => selected ? color : Colors.BG_2};
    height: ${({ value }) => value}%;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    width: 96%;
    
`

const Label = styled.View`
    margin-top: 15px;
    width: 100%;
`