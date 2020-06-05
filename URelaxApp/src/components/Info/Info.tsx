import React, { FC, ReactElement } from 'react'
import { ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components/native'
import { Typography } from '../../theming'
import { SHIMMER_COLORS } from '../Layout/Layout.style'
import { Touchable } from '../Touchable'

interface InfoProps {
    name?: string
    nameFontSize?: number
    value?: string | ReactElement
    valueFontSize?: number
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
    style,
    bottom,
    loading
}) => {

    if (!loading && value === undefined) return null
    const touchable =  onPress && !disabled
    const info = (
        <StyledItem style={!touchable && style}>
            <ShimmerName autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                { name && <Typography fontSize={nameFontSize}>{name}</Typography> }
            </ShimmerName>
            { 
                typeof value === "object" ? 
                <ShimmerValue autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                    { value }
                </ShimmerValue>
                : 
                <ShimmerValue autoRun visible={!loading} isInteraction={false} colorShimmer={SHIMMER_COLORS}>
                    <Typography fontSize={valueFontSize}>{value}</Typography>
                </ShimmerValue>
            }
            { bottom }
        </StyledItem>
    )

    return (
        touchable ? <Touchable style={style} onPress={onPress}>{info}</Touchable> : info
    )
}

const StyledItem = styled.View`
    padding: 18px 0;
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