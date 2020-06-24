
import React, { FC } from 'react'
import { ListRenderItem } from 'react-native'
import styled from 'styled-components/native'
import { InfiniteFlatList, InfiniteFlatListProps } from '../../../components/InfiniteFlatList'
import { DEFAULT_VERTICAL_SPACING, TypographyMedium } from '../../../theming'
import { GraphBar } from './GraphBar'

export interface DataGraph {
    label: string
    value: number
}

interface AnalysisGraphicPros {
    data: DataGraph[]
    minLengthToLoadMore: InfiniteFlatListProps<DataGraph>["minLengthToLoadMore"]
    onEndPageReached?: InfiniteFlatListProps<DataGraph>["onEndPageReached"]
}

export const AnalysisGraphic: FC<AnalysisGraphicPros> = ({ data, onEndPageReached }) => {
    
    const render: ListRenderItem<DataGraph> = ({ item, index }) => {
        return <GraphBar 
            key={index}
            value={item.value}
            mainLabel={item.label}/>
    }

    return (
        <React.Fragment>
            <Title textAlign="center">02/Jan</Title>
            <Container>
                <InfiniteFlatList
                    horizontal
                    bounces
                    showsHorizontalScrollIndicator={false}
                    data={data}
                    minLengthToLoadMore={10}
                    renderItem={render}
                    onEndPageReached={onEndPageReached}
                    initialScrollIndex={data.length - 1}
                    keyExtractor={(item, index) => `op_${index}`}/>
            </Container>
        </React.Fragment>
    )
}

const Container = styled.View`
    flex-direction: row;
    flex: 1;
    /* align-items: center; */
    justify-content: center;
    /* background-color: blue; */
`

const Title = styled(TypographyMedium)`
    margin: ${DEFAULT_VERTICAL_SPACING}px 0;
`