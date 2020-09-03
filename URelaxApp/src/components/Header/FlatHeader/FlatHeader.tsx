import React, { FC, ReactElement } from 'react'
import styled from 'styled-components/native'
import { Colors } from '../../../theming'

export interface FlatHeaderProps {
    bgHeaderColor?: string
    left?: ReactElement
    center?: ReactElement | boolean
    right?: ReactElement
    borderBottomWidth?: number
    borderBottomColor?: string
    withFloatingStatusbar?: boolean
}

export const FlatHeader: FC<FlatHeaderProps> = ({ 
    left,
    center,
    right, 
    bgHeaderColor = Colors.WHITE,
    borderBottomWidth = 1,
    borderBottomColor = Colors.GRAY_4,
    withFloatingStatusbar = true
}) => {
    return (
        <Container 
            bgColor={bgHeaderColor} 
            borderBottomWidth={borderBottomWidth} 
            borderBottomColor={borderBottomColor}
            floating={withFloatingStatusbar}>
            <Left>
                { left }
            </Left>
            <Content>
                { center }
            </Content>
            <Right>
                { right }
            </Right>
        </Container>
    )
}

const Container = styled.View<{ bgColor: string, borderBottomWidth: number, borderBottomColor: string, floating: boolean }>`
    border-bottom-width: ${({ borderBottomWidth }) => borderBottomWidth}px;
    border-bottom-color: ${({ borderBottomColor }) => borderBottomColor};
    padding: ${({ floating }) => floating ? 23 : 0}px 5px 0 5px;
    min-height: ${({ floating }) => floating ? 83 : 60}px;
    background-color: ${({ bgColor }) => bgColor};
    flex-direction: row;
    width: 100%;
`

const Left = styled.View`
    justify-content: center;
    min-width: 50px;
`

const Right = styled.View`
    flex-direction: row;
    align-items: center;
    min-width: 50px;
`

const Content = styled.View`
    justify-content: center;
    flex: 2;
`