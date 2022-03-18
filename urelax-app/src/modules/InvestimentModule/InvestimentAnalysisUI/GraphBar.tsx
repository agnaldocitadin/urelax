
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Touchable } from '../../../components/Touchable'
import { Colors, Typography } from '../../../theming'

interface GraphBarPros {
    index: number
    value: number
    mainLabel: string
    label?: string
    selected?: boolean
    onPress?(index: number): void
}

export const GraphBar: FC<GraphBarPros> = ({ value, mainLabel, label, onPress, index, selected }) => {
    return (
        <Touchable
            borderless={false}
            onPressOut={() => onPress && onPress(index)}>
            <Container>
                <Bars>
                    <BarUpContent>
                        { value > 0 && <BarUp 
                            value={value} 
                            color={Colors.BLUES_3} 
                            selected={selected}/>
                        }
                    </BarUpContent>
                    <BarDownContent>
                        { value < 0 && <BarDown 
                            value={value * -1}
                            color={Colors.RED_ERROR}
                            selected={selected}/>
                        }
                    </BarDownContent>
                </Bars>
                <Label>
                    <Typography
                        color={selected ? Colors.BLACK_1 : Colors.BG_2}
                        fontSize={11}
                        textAlign="center">
                        {mainLabel}
                    </Typography>
                    { label && <Typography
                        color={selected ? Colors.BLACK_1 : Colors.BG_2}
                        textAlign="center">
                        {label}
                    </Typography> }
                </Label>
            </Container>
        </Touchable>
    )
}

const Container = styled.View`
    align-items: center;
    padding-bottom: 20px;
    width: 80px;
`

const Bars = styled.View`
    width: 100%;
    flex: 1;
`

const Label = styled.View`
    width: 100%;
`

const BarUpContent = styled.View`
    flex: 1;
    border-bottom-width: 1px;
    border-color: ${Colors.BG_2};
    align-items: center;
    justify-content: flex-end;
`

const BarDownContent = styled.View`
    align-items: center;
    flex: 1;
`

const BarUp = styled.View<{ value: number, color: string, selected?: boolean }>`
    border-color: ${({ selected, color }) => selected ? color : Colors.BG_2};
    background-color: ${Colors.GRAY_4};
    height: ${({ value }) => value}%;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    border-top-width: 3px;
    width: 75%;
`

const BarDown = styled(BarUp)`
    border-top-right-radius: 0;
    border-top-left-radius: 0;
    border-bottom-right-radius: 5px;
    border-bottom-left-radius: 5px;
    border-bottom-width: 3px;
    border-top-width: 0;
`