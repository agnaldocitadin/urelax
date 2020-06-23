import React from 'react'
import styled from 'styled-components/native'
import { Colors } from '../../theming'
import { InfiniteFlatList, InfiniteFlatListProps } from '../InfiniteFlatList'

export interface TimelineProps<T> extends InfiniteFlatListProps<T> {}

export const Timeline = <T extends {}>(props: InfiniteFlatListProps<T>) => {
    return (
        <InfiniteFlatList 
            {...props}
            ListFooterComponent={<Line/>}/>
    )
}

const Line = styled.View`
    border-color: ${Colors.BG_2};
    border-right-width: 1px;
    width: 32.6px;
    height: 100%;
`