import React, { FC } from 'react'
import { PrimaryLayout } from '../../../components/Layout/PrimaryLayout'
import { ts } from '../../../core/I18n'
import { StatementTimeline } from '../StatementTimeline'
import { useStatementUIHook } from './StatementUIHook'

export const StatementUI: FC = () => {
    
    const {
        loading,
        statements,
        handleRefresh,
        handleLoadMoreData
    } = useStatementUIHook()

    return (
        <PrimaryLayout title={ts("statement")} loading={loading}>
            <StatementTimeline
                data={statements}
                onRefresh={handleRefresh}
                minLengthToLoadMore={20}
                onEndPageReached={handleLoadMoreData}/>
        </PrimaryLayout>
    )
}