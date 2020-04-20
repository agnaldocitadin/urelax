import React, { FC } from 'react'
import { Text, View } from 'react-native'
import styled from 'styled-components'
import { Colors, Theme } from '../../../../core/Theme'

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

const StyledHeader: any = styled(View)`
    background-color: ${(props: any) => props.bgColor};
    border-bottom-width: ${(props: any) => `${props.borderBottomWidth}px`};
    border-bottom-color: ${(props: any) => props.borderBottomColor};
    flex-direction: row;
    padding: 0 5px;
    min-height: 60px;
    width: 100%;
    z-index: 1;
`

const StyledLeftHeader = styled(View)`
    justify-content: center;
    min-width: 50px;
`

const StyledRightHeader = styled(View)`
    justify-content: center;
    min-width: 50px;
`

const StyledBody = styled(View)`
    justify-content: center;
    align-items: center;
    flex: 2;
`

const StyledHeaderTitle: any = styled(Text)`
    font-family: ${Theme.FONT_MEDIUM};
    color: ${(props: any) => props.color};
    font-size: 14px;
`