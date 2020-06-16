import React, { FC, useCallback } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { InfiniteFlatList } from '../../../components/InfiniteFlatList'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { Touchable } from '../../../components/Touchable'
import { ts } from '../../../core/I18n'
import { Typography } from '../../../theming'
import { useStatementUIHook } from './StatementUIHook'

export const StatementUI: FC = ({ children }) => {
    
    const {
        history,
        handleRefresh,
        handleEventPress,
        handleLoadMoreData
    } = useStatementUIHook()

    const renderHistory = useCallback(({ item }) => (
        <Touchable onPress={() => handleEventPress(item)} noChevron>
            <Typography>{item.date}</Typography>
        </Touchable>
    ), [])
    
    return (
        <FlatLayout>
            <BackHeader title={ts("statement")}/>
            <InfiniteFlatList
                data={history}
                onRefresh={handleRefresh}
                minLengthToLoadMore={20}
                onEndPageReached={handleLoadMoreData}
                renderItem={renderHistory}
                keyExtractor={(_item, index) => `hy_${index}`}/>
        </FlatLayout>
    )
}