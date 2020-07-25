
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
            <Bar hei={value}>
                <BarInter hei={50} cor={color} selected={selected}/>
            </Bar>
            <Label>
                <Typography fontSize={11} textAlign="center">{mainLabel}</Typography>
                { label && <Typography textAlign="center">{label}</Typography> }
            </Label>
        </Container>
    )
}

const Container = styled.View`
    background-color: ${Colors.WHITE};
    align-items: center;
    width: 50px;
    /* background-color: red; */
`

const Bar = styled.View`
    background-color: ${Colors.GRAY_4};
    border-radius: 5px;
    justify-content: flex-end;
    align-items: center;
    width: 70%;
    flex: 1;
`
const BarInter = styled.View`
    background-color: ${({ cor, selected }) => selected ? cor : Colors.GRAY_3};
    height: ${({ hei }) => hei}%;
    border-radius: 5px;
    width: 100%;
    
`

const Label = styled.View`
    margin: 15px 0;
    width: 100%;
`