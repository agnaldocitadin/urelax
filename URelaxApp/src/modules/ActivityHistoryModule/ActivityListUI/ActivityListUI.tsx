import React, { FC } from 'react'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'
import { ActivityTimeline } from '../ActivityTimeline'
import { useActivityListUIHook } from './ActivityListUIHook'

interface ActivityListUIProps {}

export const ActivityListUI: FC<ActivityListUIProps> = () => {
    const { activities, fail, handleRefresh, handleLoadMoreData, handleActivityPress } = useActivityListUIHook()
    return (
        <PrimaryLayout
            fail={fail}
            bgColor={Colors.WHITE}
            title={ts("activities")}>
            { !fail && <ActivityTimeline
                activities={activities}
                minLengthToLoadMore={10}
                onRefresh={handleRefresh}
                onLoadMoreData={handleLoadMoreData}
                onPress={handleActivityPress}/> }
        </PrimaryLayout>
    )
}