import React, { FC, ReactElement } from 'react'
import styled from 'styled-components/native'
import { Colors, TypographyMedium } from '../../../theming'

export interface FlatHeaderProps {
    title: string,
    titleColor?: string,
    bgHeaderColor?: string
    left?: ReactElement
    right?: ReactElement
    borderBottomWidth?: number
    borderBottomColor?: string
}

export const FlatHeader: FC<FlatHeaderProps> = ({ 
    left, 
    right, 
    title, 
    titleColor = Colors.BLACK_1,
    bgHeaderColor = Colors.WHITE,
    borderBottomWidth = 1,
    borderBottomColor = Colors.GRAY_4
}) => {
    return (
        <Container 
            bgColor={bgHeaderColor} 
            borderBottomWidth={borderBottomWidth} 
            borderBottomColor={borderBottomColor}>
            <Left>
                { left }
            </Left>
            <Content>
                <TypographyMedium fontSize={14} color={titleColor}>{ title }</TypographyMedium>
            </Content>
            <Right>
                { right }
            </Right>
        </Container>
    )
}

const Container = styled.View<{ bgColor: string, borderBottomWidth: number, borderBottomColor: string }>`
    border-bottom-width: ${({ borderBottomWidth }) => borderBottomWidth}px;
    border-bottom-color: ${({ borderBottomColor }) => borderBottomColor};
    background-color: ${({ bgColor }) => bgColor};
    flex-direction: row;
    min-height: 60px;
    padding: 0 5px;
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
    align-items: center;
    flex: 2;
`