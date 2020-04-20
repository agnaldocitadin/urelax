import { BalanceSheetHistorySummary, GroupBy } from 'honeybee-api'
import React, { FC, useCallback } from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { InfiniteFlatList } from '../../../../ui/components/InfiniteFlatList'
import { Touchable } from '../../../../ui/components/Touchable'
import { BalanceHistoryItem } from '../BalanceHistoryItem'

interface BalanceHistoryTimelineProps {
    balances: BalanceSheetHistorySummary[]
    minLengthToLoadMore: number
    grouping?: GroupBy
    loading?: boolean
    onRefresh?(): Promise<void>
    onPress?(balance: BalanceSheetHistorySummary): void
    onLoadMoreData?(page: number): Promise<BalanceSheetHistorySummary[]>
}

export const BalanceHistoryTimeline: FC<BalanceHistoryTimelineProps> = ({ 
    balances, 
    onRefresh, 
    minLengthToLoadMore, 
    onLoadMoreData,
    onPress,
    loading,
    grouping = "day"
}) => {
    
    const maxAmount = balances.reduce((max, value) => value.amount && value.amount > max ? value.amount : max, 0)

    const renderBalanceHistory = useCallback(({ item }: any) => (
        <STouchable onPress={() => onPress && onPress(item)}>
            <SBalanceHistoryItem
                label={item.label} 
                value={item.amount} 
                variation={item.amountVariation} 
                valueReference={maxAmount}
                loading={loading}/>
        </STouchable>
    ), [loading])

    return (
        <InfiniteFlatList
            showShimmer={loading}
            numShimmerItens={8}
            data={balances}
            onRefresh={onRefresh}
            minLengthToLoadMore={minLengthToLoadMore}
            onEndPageReached={onLoadMoreData}
            renderItem={renderBalanceHistory}
            keyExtractor={(item, index) => `bhi_${index}`}/>
    )
}

const STouchable = styled(Touchable)`
    padding: 18px 20px;
`

const SBalanceHistoryItem = styled(BalanceHistoryItem)`
    flex: 1;
`

const ShimmerBody = styled(View)`
    padding: 18px 20px;
`