import React, { FC, ReactElement } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors, DEFAULT_VERTICAL_SPACING, TypographyMedium } from '../../theming'
import { WizardIcon, WizardState } from './WizardIcon'
import { WizardViewProps } from './WizardView'

interface WizardChild {
    id: string
    view: ReactElement<WizardViewProps>
}

export interface WizardProps {
    defaultColor?: string
    selectedColor?: string
    index: number
    views: WizardChild[]
    sequence: string[]
    style?: ViewStyle
}

export const Wizard: FC<WizardProps> = ({
    style,
    index = 0,
    views,
    sequence,
    defaultColor = Colors.BG_4,
    selectedColor = Colors.BLUES_1
}) => {

    const viewName = sequence[index]
    const child = views.find(view => view.id === viewName)

    return (
        <Container style={style}>
            <IconContent>
                {
                    sequence.map((viewName, viewIndex) => {
                        const child = views.find(view => view.id === viewName)
                        const { icon, label } = (child?.view?.props as WizardViewProps)
                        
                        let state = WizardState.NOT_SELECTED
                        let labelColor
                        let leftLineColor = String(Colors.TRANSPARENT)
                        let rightLineColor = String(Colors.TRANSPARENT)
                        
                        if (index > viewIndex) {
                            state = WizardState.REACHED
                            labelColor = defaultColor
                            rightLineColor = selectedColor

                            if (viewIndex !== 0) {
                                leftLineColor = selectedColor
                            }
                        }

                        if (index === viewIndex) {
                            state = WizardState.SELECTED
                            labelColor= selectedColor
                            if (sequence.length - 1 !== viewIndex) {
                                rightLineColor = defaultColor
                            }
                            
                            if (viewIndex !== 0) {
                                leftLineColor = selectedColor
                            }
                        }
                        
                        if (index < viewIndex) {
                            state = WizardState.NOT_SELECTED
                            labelColor = defaultColor
                            leftLineColor = defaultColor
                            if (sequence.length - 1 !== viewIndex) {
                                rightLineColor = defaultColor
                            }
                        }

                        return (
                            <Box key={`view_${viewName}`}>
                                <IconBox>
                                    <Line color={leftLineColor}/>
                                    <WizardIcon
                                        primaryColor={selectedColor}
                                        thirdColor={defaultColor}
                                        state={state}
                                        icon={icon}/>
                                    <Line color={rightLineColor}/>
                                </IconBox>
                                { label && <Label 
                                    color={labelColor}
                                    textAlign="center">
                                        {label}
                                    </Label>
                                }
                            </Box>
                        )
                    })
                }
            </IconContent>
            <Content>
                { child?.view }
            </Content>
        </Container>        
    )
}

const Line = styled.View<{ color: string }>`
    background-color: ${({ color }) => color};
    height: 3px;
    flex: 1;
`

const Container = styled.View`
    flex: 1;
`

const IconContent = styled.View`
    margin-bottom: ${DEFAULT_VERTICAL_SPACING}px;
    flex-direction: row;
`

const Content = styled.View`
    flex: 1;
`

const Box = styled.View`
    align-items: center;
    flex: 1;
`

const IconBox = styled.View`
    justify-content: center;
    align-items: center;
    flex-direction: row;
    width: 100%;
`

const Label = styled(TypographyMedium)`
    margin-top: 10px;
`