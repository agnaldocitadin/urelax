import { Activity } from 'honeybee-api'
import React, { FC, ReactElement, useCallback } from 'react'
import styled from 'styled-components/native'
import { InfiniteFlatList } from '../../../components/InfiniteFlatList'
import { TouchItem } from '../../../components/TouchItem'
import { Colors } from '../../../theming'
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

    const renderActivity = useCallback(({ item }: any) => (
        <Item onPress={() => onPress(item)} noChevron>
            <SActivityItem activity={item} loading={loading}/>
        </Item>
    ), [loading])

    return (
        <React.Fragment>
            {/* <Timeline/> */}
            <InfiniteFlatList
                data={activities}
                onRefresh={onRefresh}
                minLengthToLoadMore={minLengthToLoadMore}
                onEndPageReached={onLoadMoreData}
                renderItem={renderActivity}
                keyExtractor={(_item, index) => `acty_${index}`}
                ListHeaderComponent={header}/>
        </React.Fragment>
    )
}

const SActivityItem = styled(ActivityItem)`
    flex: 1;
`

const Item = styled(TouchItem)`
    /* padding: 20px 20px; */
`

const Timeline = styled.View`
    border-right-width: 1px;
    border-right-color: ${Colors.BG_2};
    width: 40px;
    height: 100%;
    position: absolute;
    bottom: 0;
`