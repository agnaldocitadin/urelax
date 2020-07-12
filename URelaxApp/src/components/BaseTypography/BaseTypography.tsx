import React, { FC } from 'react'
import { TextProps, TextStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components/native'
import { Colors, DEFAULT_FONTSIZE, SHIMMER_COLORS } from '../../theming'

export interface BaseTypographyProps extends TextProps {
    loading?: boolean
    color?: string
    fontSize?: number
    textAlign?: "left" | "center" | "right"
    style?: TextStyle
    onPress?(): void
}

export const BaseTypography: FC<BaseTypographyProps> = ({ children, loading, ...others }) => {
    return (
        <ShimmerName
            autoRun 
            visible={!loading} 
            isInteraction={false}
            colorShimmer={SHIMMER_COLORS}
            height={others.fontSize}>
            <Typography {...others}>
                { children }
            </Typography>
        </ShimmerName>       
    )
}

const Typography = styled.Text<{ color?: string, fontSize?: number, textAlign?: "left" | "center" | "right" }>`
    color: ${({ color }) => color || Colors.BLACK_1};
    font-size: ${({ fontSize }) => `${fontSize || DEFAULT_FONTSIZE}px`};
    text-align: ${({ textAlign }) => textAlign || "left"};
`

const ShimmerName = styled(ShimmerPlaceHolder)<{ height?: number }>`
    height: ${({ height }) => `${(height || DEFAULT_FONTSIZE) * 1.35}px`};
    margin: 3px 0;
`