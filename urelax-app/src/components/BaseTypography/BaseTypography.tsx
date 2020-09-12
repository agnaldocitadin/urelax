import React, { FC } from 'react'
import { TextProps, TextStyle } from 'react-native'
import LinearGradient from 'react-native-linear-gradient'
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
        <ShimmerPlaceHolder
            visible={!loading} 
            isInteraction={false}
            height={others.fontSize}
            shimmerColors={shimmerColor}
            LinearGradient={LinearGradient}>
            <Typography {...others}>
                { children }
            </Typography>
        </ShimmerPlaceHolder>       
    )
}

const Typography = styled.Text<{ textAlign?: "left" | "center" | "right" }>`
    text-align: ${({ textAlign }) => textAlign || "left"};
`