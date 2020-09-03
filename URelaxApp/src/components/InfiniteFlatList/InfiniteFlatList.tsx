
import React from 'react'
import { ActivityIndicator, FlatList, FlatListProps, FlexStyle } from 'react-native'
import styled from 'styled-components/native'
import { useInfiniteFlatListHook } from './InfiniteFlatListHook'

export interface InfiniteFlatListProps<T> extends FlatListProps<T> {
    align?: FlexStyle["justifyContent"]
    showShimmer?: boolean
    numShimmerItens?: number
    minLengthToLoadMore: number
    onRefresh?(): Promise<void>
    onEndPageReached?(page: number): Promise<T[]>
    onLoadError?(error: any): void
}

export const InfiniteFlatList = <T extends {}>(props: InfiniteFlatListProps<T>) => {
    
    const { 
        internalData,
        loading,
        refreshing,
        handleRefresh,
        handleEndReached,
        pseudos
    } = useInfiniteFlatListHook(props)

    if (props.showShimmer) {
        return <FlatList 
            {...props}
            keyExtractor={(item, index) => `psdo_${index}`}
            refreshing={false}
            data={pseudos()}/>
    }

    return <FlatList 
        {...props}
        data={internalData}
        refreshing={refreshing}
        onRefresh={handleRefresh}
        onEndReached={handleEndReached}
        contentContainerStyle={{ flexGrow: 1, justifyContent: props.align || "flex-start" }}
        ListFooterComponent={loading ? <Indicator/> : props.ListFooterComponent}/>
}

const Indicator = styled(ActivityIndicator)`
    margin: 20px 0;
`