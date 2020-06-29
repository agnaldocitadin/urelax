import { Transaction } from 'honeybee-api'
import React, { FC } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { ts } from '../../../core/I18n'
import { StatementTimeline } from '../StatementTimeline'
import { useStatementUIHook } from './StatementUIHook'

export const StatementUI: FC = () => {
    
    const {
        statements,
        handleRefresh,
        handleEventPress,
        handleLoadMoreData
    } = useStatementUIHook()

    return (
        <FlatLayout>
            <BackHeader title={ts("statement")}/>
            <StatementTimeline
                data={statements}
                onRefresh={handleRefresh}
                minLengthToLoadMore={20}
                onEndPageReached={handleLoadMoreData}
                onPress={handleEventPress}/>
        </FlatLayout>
    )
}