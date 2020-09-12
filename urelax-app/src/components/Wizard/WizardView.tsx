import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

export interface WizardViewProps {
    icon: string
    label?: string
    style?: ViewStyle
    scrollable?: boolean
}

export const WizardView: FC<WizardViewProps> = ({ children, style, scrollable = false }) => {
    if (scrollable) {
        return (
            <Scroll contentContainerStyle={{ justifyContent: "flex-start", flexGrow: 1 }} style={style}>
                { children }
            </Scroll>
        )    
    }

    return (
        <Content style={style}>
            { children }
        </Content>
    )
}

const Scroll = styled.ScrollView``

const Content = styled.View`
    flex: 1;
`