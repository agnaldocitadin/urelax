
import React, { FC } from 'react'
import { ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { InfiniteFlatList, InfiniteFlatListProps } from '../../../components/InfiniteFlatList'
import { DEFAULT_VERTICAL_SPACING, Typography } from '../../../theming'
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
    onEndPageReached?: InfiniteFlatListProps<DataGraph>["onEndPageReached"]
    onSelect?(index: number): void
}

export const AnalysisGraphic: FC<AnalysisGraphicPros> = ({ data, selectedIndex, onEndPageReached, onSelect }) => {
    
    const render: ListRenderItem<DataGraph> = ({ item, index }) => {
        return <GraphBar
            index={index}
            value={item.value}
            mainLabel={item.label}
            color={item.color}
            selected={index === selectedIndex}
            onPress={onSelect}/>
    }

    const selectedItem = (selectedIndex !== undefined && data[selectedIndex]) || undefined

    return (
        <React.Fragment>
            <Title textAlign="center">{ selectedItem?.label }</Title>
            <Container>
                { data.length > 0 && <InfiniteFlatList
                    horizontal
                    bounces
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    minLengthToLoadMore={10}
                    renderItem={render}
                    onEndPageReached={onEndPageReached}
                    initialScrollIndex={data.length - 1}
                    keyExtractor={(item, index) => `op_${index}`}/>}
            </Container>
        </React.Fragment>
    )
}

const Container = styled.View`
    justify-content: center;
    flex-direction: row;
    flex: 1;
`

const Title = styled(Typography)`
    margin: ${DEFAULT_VERTICAL_SPACING}px 0;
`