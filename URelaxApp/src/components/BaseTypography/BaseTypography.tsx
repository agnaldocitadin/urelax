import React, { FC } from 'react'
import { TextProps, TextStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components/native'

export interface BaseTypographyProps extends TextProps {
    loading?: boolean
    color?: string
    shimmerColor?: string[]
    fontSize?: number
    textAlign?: "left" | "center" | "right"
    style?: TextStyle
    onPress?(): void
}

export const BaseTypography: FC<BaseTypographyProps> = ({ children, loading, shimmerColor, ...others }) => {
    return (
        <ShimmerName
            autoRun 
            visible={!loading} 
            isInteraction={false}
            colorShimmer={shimmerColor}
            height={others.fontSize}>
            <Typography {...others}>
                { children }
            </Typography>
        </ShimmerName>       
    )
}

const Typography = styled.Text<{ textAlign?: "left" | "center" | "right" }>`
    text-align: ${({ textAlign }) => textAlign || "left"};
`

const ShimmerName = styled(ShimmerPlaceHolder)<{ height?: number }>`
    height: ${({ height }) => `${height || 0 * 1.35}`}px;
    margin: 3px 0;
`