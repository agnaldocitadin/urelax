import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'
import { ActivityTimeline } from '../ActivityTimeline'
import { useActivityListUIHook } from './ActivityListUIHook'

interface ActivityListUIProps {}

export const ActivityListUI: FC<ActivityListUIProps> = () => {
    const { activities, fail, handleRefresh, handleLoadMoreData, handleActivityPress } = useActivityListUIHook()
    return (
        <FlatLayout
            fail={fail}
            bgColor={Colors.WHITE}
            header={
                <BackHeader title={ts("activities")}/>
            }>
            
            { !fail && <ActivityTimeline
                activities={activities}
                minLengthToLoadMore={10}
                onRefresh={handleRefresh}
                onLoadMoreData={handleLoadMoreData}
                onPress={handleActivityPress}/>}
        </FlatLayout>
    )
}