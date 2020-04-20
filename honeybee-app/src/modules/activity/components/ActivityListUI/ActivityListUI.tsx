
import React, { FC } from 'react'
import { NavigationStackProp } from 'react-navigation-stack'
import { ts } from '../../../../core/I18n'
import { BackHeader } from '../../../../ui/components/Header/BackHeader'
import { FlatLayout } from '../../../../ui/components/Layout/FlatLayout'
import { ActivityTimeline } from '../ActivityTimeline'
import { useActivityListUIHook } from './ActivityListUIHook'

interface ActivityListUIProps {
    navigation: NavigationStackProp
}

export const ActivityListUI: FC<ActivityListUIProps> = ({ navigation }) => {
    const { activities, fail, handleRefresh, handleLoadMoreData, handleActivityPress } = useActivityListUIHook(navigation)
    return (
        <FlatLayout fail={fail}>
            <BackHeader title={ts("activities")}/>
            { !fail && <ActivityTimeline
                loading={activities.length === 0}
                activities={activities}
                minLengthToLoadMore={10}
                onRefresh={handleRefresh}
                onLoadMoreData={handleLoadMoreData}
                onPress={handleActivityPress}/>}
        </FlatLayout>
    )
}