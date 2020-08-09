import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Colors } from '../../theming'

interface CardProps {}

export const Card: FC<CardProps> = ({ children }) => {
    return (
        <Container>
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