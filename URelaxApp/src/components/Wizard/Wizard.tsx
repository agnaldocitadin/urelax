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
    index: number
    views: WizardChild[]
    sequence: string[]
    style?: ViewStyle
}

export const Wizard: FC<WizardProps> = ({
    style,
    index = 0,
    views,
    sequence
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
                        
                        if (index > viewIndex) {
                            state = WizardState.REACHED
                            labelColor = Colors.BG_4
                        }

                        if (index === viewIndex) {
                            state = WizardState.SELECTED
                            labelColor= Colors.BLUES_1
                        }

                        if (index < viewIndex) {
                            state = WizardState.NOT_SELECTED
                            labelColor = Colors.BG_4
                        }

                        const hiddenLeftLine = viewIndex === 0 || state === WizardState.NOT_SELECTED
                        const hiddenRightLine = sequence.length - 1 === viewIndex || state !== WizardState.REACHED

                        return (
                            <Box key={`view_${viewName}`}>
                                <IconBox>
                                    <Line hidden={hiddenLeftLine}/>
                                    <WizardIcon state={state} icon={icon}/>
                                    <Line hidden={hiddenRightLine}/>
                                </IconBox>
                                { label && <Label color={labelColor} textAlign="center">{label}</Label>}
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

const Line = styled.View<{ hidden: boolean }>`
    background-color: ${({ hidden }) => hidden ? Colors.TRANSPARENT : Colors.BLUES_3};
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