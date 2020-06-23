
import { Transaction } from 'honeybee-api'
import React, { FC, useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { Timeline, TimelineItem, TimelineProps } from '../../../components/Timeline'
import { Icons, Typography } from '../../../theming'

interface StatementTimelineProps {
    data: Transaction[]
    onRefresh?: TimelineProps<Transaction>["onRefresh"]
    minLengthToLoadMore: TimelineProps<Transaction>["minLengthToLoadMore"]
    onEndPageReached?: TimelineProps<Transaction>["onEndPageReached"]
    ListHeaderComponent?: TimelineProps<Transaction>["ListHeaderComponent"]
    onPress?(transaction: Transaction): void
}

export const StatementTimeline: FC<StatementTimelineProps> = ({ onPress, ...others}) => {

    const renderEvent: ListRenderItem<Transaction> = useCallback(({ item, index }) => {
        return <TimelineItem
            noChevron
            disabled
            index={index}
            icon={Icons.CIRCLE_MEDIUM}
            content={<Typography>{item.dateTime.toISOString()}</Typography>}
            onPress={() => onPress && onPress(item)}/>
    }, [])

    return (
        <Timeline
            {...others}
            renderItem={renderEvent}
            keyExtractor={(_item, index) => `stm_${index}`}/>
    )
}
