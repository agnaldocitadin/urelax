import React, { ReactElement } from 'react'
import styled from 'styled-components/native'
import { Colors } from '../../theming'
import { InfiniteFlatList, InfiniteFlatListProps } from '../InfiniteFlatList'

export interface Volta {
    color: string
    icon: string
    content: ReactElement
    onPress(): void
}

interface TimelineProps<T> extends InfiniteFlatListProps<T> {}

export const Timeline = <T extends {}>({ ...others }: InfiniteFlatListProps<T>) => {
    return (
        <React.Fragment>
            <Line/>
            <InfiniteFlatList {...others}/>
        </React.Fragment>
    )
}

const Line = styled.View`
    border-right-width: 1px;
    border-color: ${Colors.BG_2};
    position: absolute;
    height: 100%;
    width: 32.6px;
`