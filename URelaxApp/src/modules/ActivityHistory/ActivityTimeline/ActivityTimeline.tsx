import { Activity } from 'honeybee-api'
import React, { FC, ReactElement, useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { Timeline } from '../../../components/Timeline'
import { TimelineItem } from '../../../components/Timeline/TimelineItem'
import { ActivityItem } from '../ActivityItem'

export interface ActivityTimelineProps {
    activities: Activity[]
    minLengthToLoadMore: number
    header?: ReactElement
    loading?: boolean
    onPress(activity: Activity): void
    onRefresh?(): Promise<void>
    onLoadMoreData?(page: number): Promise<Activity[]>
}

export const ActivityTimeline: FC<ActivityTimelineProps> = ({ 
    activities,
    minLengthToLoadMore,
    header,
    loading,
    onPress, 
    onRefresh,
    onLoadMoreData
 }) => {

    const render: ListRenderItem<Activity> = useCallback(({ item, index }) => {
        return <TimelineItem 
            index={index}
            icon={item.icon}
            color="black"
            content={<ActivityItem color="black" activity={item} />}
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