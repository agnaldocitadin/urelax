import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Touchable, TouchableProps } from '../Touchable'

export interface BaseButtonPros extends TouchableProps {
    style?: ViewStyle
    contentStyle?: ViewStyle
}

export const BaseButton: FC<BaseButtonPros> = ({ 
    children, 
    style, 
    contentStyle,
    ...others
}) => (
    <Button style={style}>
        <Touchable {...others}>
            <Content style={contentStyle}>
                { children }
            </Content>
        </Touchable>
    </Button>
)

const Button = styled.View`
    background-color: white;
    justify-content: center;
    height: 50px;
`

const Content = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: center;
    flex: 1;
`