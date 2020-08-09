import { Activity } from 'honeybee-api'
import React, { FC, ReactElement, useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { Timeline, TimelineItem } from '../../../components/Timeline'
import { ActivityItem } from '../ActivityItem'

export interface ActivityTimelineProps {
    activities: Activity[]
    minLengthToLoadMore: number
    header?: ReactElement
    onPress(activity: Activity): void
    onRefresh?(): Promise<void>
    onLoadMoreData?(page: number): Promise<Activity[]>
}

export const ActivityTimeline: FC<ActivityTimelineProps> = ({ 
    activities,
    minLengthToLoadMore,
    header,
    onPress, 
    onRefresh,
    onLoadMoreData
 }) => {

    const render: ListRenderItem<Activity> = useCallback(({ item, index }) => {
        return <TimelineItem
            index={index}
            icon={item.icon}
            content={<ActivityItem activity={item}/>}
            onPress={() => onPress(item)}
            contentDirection="row"/>
    }, [])

    return (
        <Timeline
            data={activities}
            onRefresh={onRefresh}
            minLengthToLoadMore={minLengthToLoadMore}
            onEndPageReached={onLoadMoreData}
            renderItem={render}
            keyExtractor={(_item, index) => `tmi_${index}`}
            ListHeaderComponent={header}/>
    )
}