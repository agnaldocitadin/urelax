
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Colors, Typography } from '../../../theming'

interface GraphBarPros {
    value: number
    mainLabel: string
    label?: string
}

export const GraphBar: FC<GraphBarPros> = ({ value, mainLabel, label}) => {
    return (
        <Container>
            <Bar>
                <BarInter/>
            </Bar>
            <Label>
                <Typography textAlign="center">{mainLabel}</Typography>
                { label && <Typography textAlign="center">{label}</Typography> }
            </Label>
        </Container>
    )
}

const Container = styled.View`
    width: 65px;
    align-items: center;
`

const Bar = styled.View`
    background-color: ${Colors.BG_4};
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    justify-content: flex-end;
    align-items: center;
    width: 15px;
    flex: 1;
`
const BarInter = styled.View`
    background-color: ${Colors.BLUES_4};
    height: 25%;
    border-top-left-radius: 3px;
    border-top-right-radius: 3px;
    width: 100%;
`

const Label = styled.View`
    margin: 15px 0;
    width: 100%;
`