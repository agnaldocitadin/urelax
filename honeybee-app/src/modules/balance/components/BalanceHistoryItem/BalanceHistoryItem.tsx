
import { utils } from 'js-commons'
import { Text, View } from 'native-base'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components'
import AppConfig from '../../../../core/AppConfig'
import { Colors, Theme } from '../../../../core/Theme'
import { SHIMMER_COLORS } from '../../../../ui/components/Layout/Layout.style'
import { Projection } from '../../../../ui/components/Projection'
import { VariationMonitor } from '../../../../ui/components/VariationMonitor'

interface BalanceHistoryItemProps {
    label?: string
    value?: number
    variation?: number
    valueReference: number
    loading?: boolean
    style?: ViewStyle
}

export const BalanceHistoryItem: FC<BalanceHistoryItemProps> = ({ label, loading, value = 0, variation = 0, valueReference, style }) => (
    <SBalanceHistoryItemBody style={style}>
        
        <ShimmerLabel autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
            <SBalanceHistoryItemDate>{label}</SBalanceHistoryItemDate>
        </ShimmerLabel>

        <Projection
            loading={loading}
            value={value} 
            reference={valueReference * 1.1}/>

        <ShimmerValue autoRun isInteraction={false} visible={!loading} colorShimmer={SHIMMER_COLORS}>
            <SBalanceHistoryItemValueView>
                <SBalanceHistoryItemValue>
                    {utils.formatCurrency(value, { prefix: AppConfig.CURRENCY_PREFIX })}
                </SBalanceHistoryItemValue>
                { !loading && <VariationMonitor value={variation}/>}
            </SBalanceHistoryItemValueView>
        </ShimmerValue>

    </SBalanceHistoryItemBody>
)

const SBalanceHistoryItemBody: any = styled(View)`
    justify-content: flex-end;
`

const SBalanceHistoryItemDate = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    color: ${Colors.BLACK_2};
    font-size: 12px;
    text-align: right;
`

const SBalanceHistoryItemValueView: any = styled(View)`
    flex-direction: row;
    justify-content: flex-end;
    align-items: center;
    margin-top: 5px;
`

const SBalanceHistoryItemValue: any = styled(Text)`
    color: ${Colors.GRAY_1};
    font-family: ${Theme.FONT_MEDIUM};
    font-size: 15px;
`

const ShimmerLabel = styled(ShimmerPlaceHolder)`
    width: 50px;
    margin-left: auto;
`

const ShimmerValue = styled(ShimmerPlaceHolder)`
    margin-left: auto;
`