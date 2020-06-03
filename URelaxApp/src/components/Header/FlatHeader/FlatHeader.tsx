import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Colors, TypographyMedium } from '../../../theming'

export interface FlatHeaderProps {
    title: string,
    titleColor?: string,
    bgHeaderColor?: string
    left?: Element
    right?: Element
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
        <StyledHeader 
            bgColor={bgHeaderColor} 
            borderBottomWidth={borderBottomWidth} 
            borderBottomColor={borderBottomColor}>
            <StyledLeftHeader >
                { left }
            </StyledLeftHeader>
            <StyledBody>
                <StyledHeaderTitle color={titleColor}>{ title }</StyledHeaderTitle>
            </StyledBody>
            <StyledRightHeader>
                { right }
            </StyledRightHeader>
        </StyledHeader>
    )
}

const StyledHeader = styled.View<{ bgColor: string, borderBottomWidth: number, borderBottomColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
    border-bottom-width: ${({ borderBottomWidth }) => `${borderBottomWidth}px`};
    border-bottom-color: ${({ borderBottomColor }) => borderBottomColor};
    flex-direction: row;
    padding: 0 5px;
    min-height: 60px;
    width: 100%;
    z-index: 1;
`

const StyledLeftHeader = styled.View`
    justify-content: center;
    min-width: 50px;
`

const StyledRightHeader = styled.View`
    justify-content: center;
    min-width: 50px;
`

const StyledBody = styled.View`
    justify-content: center;
    align-items: center;
    flex: 2;
`

const StyledHeaderTitle: any = styled(TypographyMedium)`
    font-size: 14px;
`