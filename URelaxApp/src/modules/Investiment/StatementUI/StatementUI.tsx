import { format } from 'date-fns/esm'
import React, { FC, useCallback } from 'react'
import { BackHeader } from '../../../components/Header/BackHeader'
import { InfiniteFlatList } from '../../../components/InfiniteFlatList'
import { FlatLayout } from '../../../components/Layout/FlatLayout'
import { TouchItem } from '../../../components/TouchItem'
import { ts } from '../../../core/I18n'
import { Typography } from '../../../theming'
import { useStatementUIHook } from './StatementUIHook'

export const StatementUI: FC = ({ children }) => {
    
    const {
        statements,
        handleRefresh,
        handleEventPress,
        handleLoadMoreData
    } = useStatementUIHook()

    const renderHistory = useCallback(({ item }) => (
        <TouchItem onPress={() => handleEventPress(item)}>
            <Typography>{format(item.date, "dd/MM/yyyy")}</Typography>
            {/* TODO */}
        </TouchItem>
    ), [])
    
    return (
        <FlatLayout>
            <BackHeader title={ts("statement")}/>
            <InfiniteFlatList
                data={statements}
                onRefresh={handleRefresh}
                minLengthToLoadMore={20}
                onEndPageReached={handleLoadMoreData}
                renderItem={renderHistory}
                keyExtractor={(_item, index) => `stm_${index}`}/>
        </FlatLayout>
    )
}