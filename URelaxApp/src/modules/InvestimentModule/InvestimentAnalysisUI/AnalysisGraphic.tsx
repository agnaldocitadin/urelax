
import React, { FC } from 'react'
import { ActivityIndicator, ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { InfiniteFlatList, InfiniteFlatListProps } from '../../../components/InfiniteFlatList'
import { GraphBar } from './GraphBar'

export interface DataGraph {
    label: string
    value: number
    color: string
}

interface AnalysisGraphicPros {
    data: DataGraph[]
    minLengthToLoadMore: InfiniteFlatListProps<DataGraph>["minLengthToLoadMore"]
    selectedIndex?: number
    loading?: boolean
    onEndPageReached?: InfiniteFlatListProps<DataGraph>["onEndPageReached"]
    onSelect?(index: number): void
}

export const AnalysisGraphic: FC<AnalysisGraphicPros> = ({
    data,
    selectedIndex,
    loading,
    onEndPageReached,
    onSelect
}) => {
    
    const maxItemValue = Math.max(...data.map(i => i.value)) * 1.15

    const render: ListRenderItem<DataGraph> = ({ item, index }) => {
        const percent = item.value === 0 ? 0 : (item.value / maxItemValue) * 100
        return <GraphBar
            index={index}
            value={percent}
            mainLabel={item.label}
            color={item.color}
            selected={index === selectedIndex}
            onPress={onSelect}/>
    }

    return (
        <React.Fragment>
            { loading ? 
                <LoadingContent>
                    <ActivityIndicator size="large" />
                </LoadingContent>
            :
                <Container>
                    { data.length > 0 && <InfiniteFlatList
                        data={data}
                        horizontal
                        showsHorizontalScrollIndicator={false}
                        minLengthToLoadMore={10}
                        renderItem={render}
                        onEndPageReached={onEndPageReached}
                        align="center"
                        inverted
                        keyExtractor={(item, index) => `op_${index}`}/>
                    }
                </Container>
            }
        </React.Fragment>
    )
}

const LoadingContent = styled.View`
    justify-content: center;
    flex: 1;
`

const Container = styled.View`
    flex-direction: row;
    flex: 1;
`