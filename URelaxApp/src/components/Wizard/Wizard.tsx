import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors, DEFAULT_VERTICAL_SPACING, TypographyMedium } from '../../theming'
import { WizardIcon, WizardState } from './WizardIcon'

interface WizardProps {
    style?: ViewStyle
    index?: number
}

export const Wizard: FC<WizardProps> = ({
    style,
    index = 0,
    children
}) => {
    return (
        <Container style={style}>
            <IconContent>
                {
                    React.Children.map(children, (child, i) => {
                        const { label, icon } = child?.props
                        let state = WizardState.NOT_SELECTED
                        let labelColor
                        
                        if (index > i) {
                            state = WizardState.REACHED
                            labelColor = Colors.BG_4
                        }

                        if (index === i) {
                            state = WizardState.SELECTED
                            labelColor= Colors.BLUES_1
                        }

                        if (index < i) {
                            state = WizardState.NOT_SELECTED
                            labelColor = Colors.BG_4
                        }

                        const hiddenLeftLine = i === 0 || state === WizardState.NOT_SELECTED
                        const hiddenRightLine = React.Children.count(children) - 1 === i || state !== WizardState.REACHED

                        return (
                            <Box>
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
                {
                    React.Children.map(children, (child, i) => {
                        if (i === index) {
                            return child
                        }
                    })
                }
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
    flex-direction: row;
`

const Content = styled.View`
    margin-top: ${DEFAULT_VERTICAL_SPACING}px;
    flex: 1;
`

const Box = styled.View`
    justify-content: center;
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