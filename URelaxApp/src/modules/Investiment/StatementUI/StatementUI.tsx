import { FinancialHistory } from 'honeybee-api'
import React, { FC, useCallback } from 'react'
import { ListRenderItem } from 'react-native'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { Timeline, TimelineItem } from '../../../components/Timeline'
import { ts } from '../../../core/I18n'
import { Icons, Typography } from '../../../theming'
import { useStatementUIHook } from './StatementUIHook'

export const StatementUI: FC = ({ children }) => {
    
    const {
        statements,
        handleRefresh,
        handleEventPress,
        handleLoadMoreData
    } = useStatementUIHook()

    const renderHistory: ListRenderItem<FinancialHistory> = useCallback(({ item, index }) => {

        return <TimelineItem
            noChevron
            disabled
            index={index}
            icon={Icons.CIRCLE_MEDIUM}
            content={<Typography>{item.date.toISOString()}</Typography>}
            // onPress={handleEventPress}
            />
    }, [])
    
    return (
        <FlatLayout>
            <BackHeader title={ts("statement")}/>
            <Timeline
                data={statements}
                onRefresh={handleRefresh}
                minLengthToLoadMore={20}
                onEndPageReached={handleLoadMoreData}
                renderItem={renderHistory}
                keyExtractor={(_item, index) => `stm_${index}`}/>
        </FlatLayout>
    )
}