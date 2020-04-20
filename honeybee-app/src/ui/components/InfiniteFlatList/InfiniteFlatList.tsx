
import React, { FC } from 'react'
import { ActivityIndicator, FlatList, FlatListProps } from 'react-native'
import styled from 'styled-components'
import { useInfiniteFlatListHook } from './InfiniteFlatListHook'

export interface InfiniteFlatListProps<T> extends FlatListProps<T> {
    showShimmer?: boolean
    numShimmerItens?: number
    minLengthToLoadMore: number
    onRefresh?(): Promise<void>
    onEndPageReached?(page: number): Promise<T[]>
}

export const InfiniteFlatList: FC<InfiniteFlatListProps<{}>> = (props) => {

    const { 
        internalData,
        loading,
        refreshing,
        handleRefresh,
        handleEndReached
    } = useInfiniteFlatListHook(props)
    
    return <FlatList 
        {...props}
        data={internalData}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        contentContainerStyle={{ flexGrow: 1 }}
        ListFooterComponent={loading ? <Indicator/> : null}/>
}

const Indicator = styled(ActivityIndicator)`
    margin: 20px 0;
`