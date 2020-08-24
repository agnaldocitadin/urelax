import React, { FC } from 'react'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { TextIconDisplay } from '../../../components/TextIconDisplay'
import { ts } from '../../../core/I18n'
import { Colors } from '../../../theming'
import { ActivityTimeline } from '../ActivityTimeline'
import { useActivityListUIHook } from './ActivityListUIHook'

interface ActivityListUIProps {}

export const ActivityListUI: FC<ActivityListUIProps> = () => {
    
    const { 
        activities,
        fail,
        loading,
        handleRefresh,
        handleLoadMoreData,
        handleActivityPress,
        showAPIError
    } = useActivityListUIHook()

    return (
        <PrimaryLayout
            fail={fail}
            bgColor={Colors.WHITE}
            title={ts("activities")}
            loading={loading}>
            { !fail && <ActivityTimeline
                activities={[]}
                empty={
                    <TextIconDisplay
                        style={{ marginTop: "50%" }}
                        iconColor={Colors.GRAY_2}
                        icon={"flask-empty-outline"}
                        title={ts("oops")}
                        message={ts("nothing_here")} />
                }
                minLengthToLoadMore={10}
                onRefresh={handleRefresh}
                onLoadMoreData={handleLoadMoreData}
                onLoadError={showAPIError}
                onPress={handleActivityPress}/> }
        </PrimaryLayout>
    )
}