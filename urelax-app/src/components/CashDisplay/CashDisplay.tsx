import { utils } from 'js-commons'
import React, { FC } from 'react'
import { View, ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components/native'
import AppConfig from '../../core/AppConfig'
import { Colors, Typography } from '../../theming'
import { SHIMMER_COLORS } from '../Layout/Layout.style'
import { VariationMonitor } from '../VariationMonitor'

interface CashDisplayProps {
    label: string
    labelSize?: number
    labelColor?: string
    value?: number
    valueSize?: number
    valueColor?: string
    variation?: number
    variationSize?: number
    variationColor?: string
    showVariation?: boolean
    loading?: boolean
    style?: ViewStyle
}

export const CashDisplay: FC<CashDisplayProps> = ({
    label,
    labelSize = 14,
    labelColor = Colors.GRAY_3,
    value = 0,
    valueSize = 16,
    valueColor = Colors.BLACK_1,
    variation = 0,
    variationSize = 14,
    variationColor = Colors.WHITE,
    showVariation = true,
    loading,
    style
}) => {
    return (
        <View style={style}>
            <Typography 
                fontSize={labelSize} 
                color={labelColor}>
                {label}
            </Typography>
            <Shimmer autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
                <SCreditValueView>
                    <Typography
                        fontSize={valueSize} 
                        color={valueColor}>
                        {utils.formatCurrency(value, { prefix: AppConfig.CURRENCY_PREFIX }) }
                    </Typography>
                    { showVariation && !loading && <VariationMonitor
                        value={variation}
                        fontSize={variationSize}
                        textColor={variationColor}/>}
                </SCreditValueView>
            </Shimmer>
        </View>
    )
}

const SCreditValueView = styled.View`
    flex-direction: row;
    align-items: center;
`

const Shimmer = styled(ShimmerPlaceHolder)`
    height: 25px;
    margin: 5px 0;
`