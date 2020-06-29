
import { FinancialHistory, Transaction } from 'honeybee-api'
import React, { FC, ReactElement, useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { Timeline, TimelineItem, TimelineProps } from '../../../components/Timeline'
import { Icons, Typography } from '../../../theming'

interface StatementTimelineData {
    icon: string
    content: ReactElement
}

interface StatementTimelineProps {
    data: StatementTimelineData[]
    onRefresh?: TimelineProps<StatementTimelineData>["onRefresh"]
    minLengthToLoadMore: TimelineProps<StatementTimelineData>["minLengthToLoadMore"]
    onEndPageReached?: TimelineProps<StatementTimelineData>["onEndPageReached"]
    ListHeaderComponent?: TimelineProps<StatementTimelineData>["ListHeaderComponent"]
    onPress?(transaction: Transaction): void
}

export const StatementTimeline: FC<StatementTimelineProps> = ({ onPress, ...others}) => {

    const renderEvent: ListRenderItem<StatementTimelineData> = useCallback(({ item, index }) => {
        return <TimelineItem
            noChevron
            disabled
            index={index}
            icon={item.icon}
            content={item.content}
            // onPress={() => onPress && onPress(item)}
            />
    }, [])

    return (
        <Timeline
            {...others}
            renderItem={renderEvent}
            keyExtractor={(_item, index) => `stm_${index}`}/>
    )
}

export const adaptStatementTimeline = (history: FinancialHistory[]) => {
    let data: StatementTimelineData[] = []

    if (!history) {
        return data
    }

    history.forEach(item => {
        data.push({
            icon: Icons.CIRCLE_MEDIUM,
            content: <Typography>{item.date}</Typography>
        })

        item.transactions.forEach(transaction => {
            data.push({
                icon: Icons.PASSWD,
                content: <Typography>{transaction.dateTime} - {transaction.value}</Typography>
            })
        })
    })
    
    return data
}
