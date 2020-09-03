import React, { FC } from 'react'
import { ViewProps } from 'react-native'
import styled from 'styled-components/native'
import { Colors } from '../../theming'

interface CardProps extends ViewProps {}

export const Card: FC<CardProps> = ({ children, ...others }) => {
    return (
        <Container {...others}>
            {children}
        </Container>
    )
}

const Container = styled.View`
    background-color: ${Colors.WHITE};
    border-color: ${Colors.GRAY_4};
    border-width: 1px;
    border-radius: 5px;
`