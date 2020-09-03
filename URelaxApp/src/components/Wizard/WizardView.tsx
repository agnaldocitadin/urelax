import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

export interface WizardViewProps {
    icon: string
    label?: string
    style?: ViewStyle
}

export const WizardView: FC<WizardViewProps> = ({ children, style }) => {
    return (
        <Content style={style}>
            { children }
        </Content>
    )
}

const Content = styled.View`
    flex: 1;
`