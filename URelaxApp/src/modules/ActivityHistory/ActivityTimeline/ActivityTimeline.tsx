import { Activity } from 'honeybee-api'
import React, { FC, ReactElement, useCallback } from 'react'
import { InfiniteFlatList } from '../../../components/InfiniteFlatList'
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

    const renderActivity = useCallback(({ item }: any) => <ActivityItem onPress={() => onPress(item)} activity={item} loading={loading} noChevron/>, [loading])

    return (
        <InfiniteFlatList
            data={activities}
            onRefresh={onRefresh}
            minLengthToLoadMore={minLengthToLoadMore}
            onEndPageReached={onLoadMoreData}
            renderItem={renderActivity}
            keyExtractor={(_item, index) => `acty_${index}`}
            ListHeaderComponent={header}/>
    )
}