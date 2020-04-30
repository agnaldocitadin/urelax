import { Text, View } from 'native-base'
import React, { FC, ReactElement } from 'react'
import { ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components'
import { Colors, Theme } from '../../../core/Theme'
import { SHIMMER_COLORS } from '../Layout/Layout.style'
import { Touchable } from '../Touchable'

interface InfoProps {
    name?: string
    nameFontSize?: number
    nameFontStyle?: Theme.FONT_REGULAR | Theme.FONT_MEDIUM | Theme.FONT_SEMIBOLD
    value?: string | ReactElement
    valueFontSize?: number
    valueFontStyle?: Theme.FONT_REGULAR | Theme.FONT_MEDIUM | Theme.FONT_SEMIBOLD
    disabled?: boolean
    onPress?(): void
    style?: ViewStyle
    bottom?: ReactElement
    loading?: boolean
}

export const Info: FC<InfoProps> = ({ 
    name, 
    value, 
    onPress, 
    disabled, 
    nameFontSize = 14, 
    valueFontSize = 16,
    nameFontStyle = Theme.FONT_REGULAR,
    valueFontStyle = Theme.FONT_REGULAR,
    style,
    bottom,
    loading
}) => {

    if (!loading && value === undefined) return null
    const touchable =  onPress && !disabled
    const info = (
        <StyledItem style={!touchable && style}>
            
            <ShimmerName autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                { name && <StyledName font={nameFontStyle} fontSize={nameFontSize}>{name}</StyledName> }
            </ShimmerName>
            
            { 
                typeof value === "object" ? 
                <ShimmerValue autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                    { value }
                </ShimmerValue>
                : 
                <ShimmerValue autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                    <StyledValue font={valueFontStyle} fontSize={valueFontSize}>{value}</StyledValue>
                </ShimmerValue>
            }

            { bottom }

        </StyledItem>
    )

    return (
        touchable ? <Touchable style={style} onPress={onPress}>{info}</Touchable> : info
    )
}

const StyledItem: any = styled(View)`
    padding: 18px 0;
`

const StyledName: any = styled(Text)`
    font-family: ${(props: any) => props.font};
    color: ${Colors.GRAY_3};
    font-size: ${(props: any) => `${props.fontSize}px`};
    width: 100%;
`

const StyledValue: any = styled(Text)`
    font-family: ${(props: any) => props.font};
    color: ${Colors.BLACK_1};
    font-size: ${(props: any) => `${props.fontSize}px`};
    width: 100%;
`

const ShimmerName = styled(ShimmerPlaceHolder)`
    height: 15px;
    width: 100px;
    margin: 4px 0;
`

const ShimmerValue = styled(ShimmerPlaceHolder)`
    height: 15px;
    width: 200px;
    margin: 4px 0;
`