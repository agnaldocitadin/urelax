import React, { FC } from 'react'
import LinearGradient from 'react-native-linear-gradient'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components/native'
import { Colors, SHIMMER_COLORS } from '../../theming'

interface ProjectionProps {
    value: number
    reference: number
    loading?: boolean
}

export const Projection: FC<ProjectionProps> = ({ value, reference, loading }) => (
    <Shimmer
        isInteraction={false}
        visible={!loading}
        shimmerColors={SHIMMER_COLORS}>
        <SProjectionTrack/>
        <SProjection 
            start={{x: 0, y: 0}} 
            end={{x: 1, y: 0}} 
            colors={[Colors.BLUES_4, Colors.BLUES_2]} 
            width={value * 100 / reference}/>
    </Shimmer>
)

const Shimmer = styled(ShimmerPlaceHolder)`
    margin-left: auto;
    width: 100%;
    margin-top: 3px;
    margin-bottom: 3px;
`

const SProjection: any = styled(LinearGradient)`
    width: ${(props: any) => props.width}%;
    border-radius: 2px;
    height: 4px;
`

const SProjectionTrack = styled.View`
    background-color: ${Colors.BG_3};
    border-radius: 2px;
    width: 100%;
    height: 4px;
    top: 4px;
`