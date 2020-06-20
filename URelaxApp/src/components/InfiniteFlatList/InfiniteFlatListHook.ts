import { useCallback, useEffect, useState } from "react"
import { InfiniteFlatListProps } from './InfiniteFlatList'

type ListState = {
    infiniteReached?: boolean,
    page?: number,
    internalData?: any,
    loading?: boolean,
    refreshing?: boolean
}

export const useInfiniteFlatListHook = <T extends {}>({ 
    onRefresh,
    onEndPageReached,
    data,
    minLengthToLoadMore,
    numShimmerItens = 0
}: InfiniteFlatListProps<T>) => {

    const [ listState, setListState ] = useState({
        infiniteReached: false,
        page: 1,
        internalData: data,
        loading: false,
        refreshing: false
    } as ListState)

    const updateState = useCallback((state: ListState) => setListState(old => ({ ...old, ...state })), [listState])

    const pseudos = useCallback(() => {
        let objs: T[] = []
        for (let i = 0; i < numShimmerItens; i++) objs.push({} as any)
        return objs
    }, [numShimmerItens])

    const handleRefresh = useCallback(() => {
        if (onRefresh) {
            updateState({ refreshing: true })
            onRefresh()
                .then(() => updateState({ refreshing: false }))
                .catch(() => updateState({ refreshing: false }))
        }
    }, [onRefresh])

    const handleEndReached = () => {
        const isLoadMore = !listState.infiniteReached && listState.internalData?.length >= minLengthToLoadMore && onEndPageReached && !listState.loading
        if (isLoadMore) {
            updateState({ loading: true })
            const _page = listState.page || 1
            
            onEndPageReached && onEndPageReached(_page)
            .then(newData => {
                    const noMoreData = newData.length === 0
                    if (!noMoreData && listState.internalData) {
                        newData.forEach((data: any) => (<any[]>listState.internalData).push(data))
                    }
                    updateState({ 
                        internalData: listState.internalData, 
                        loading: false, 
                        page: _page + 1, 
                        infiniteReached: noMoreData 
                    })

                }).catch(() => updateState({ loading: false }))
        }
    }

    useEffect(() => updateState({ internalData: data || [], infiniteReached: false }), [data])
    
    return {
        internalData: listState.internalData,
        loading: listState.loading,
        refreshing: listState.refreshing,
        handleRefresh: onRefresh ? handleRefresh : undefined,
        handleEndReached,
        pseudos
    }
}