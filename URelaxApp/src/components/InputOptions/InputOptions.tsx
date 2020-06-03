import React, { FC, ReactElement, useCallback } from 'react'
import { TouchableNativeFeedback } from 'react-native'
import ShimmerPlaceHolder from 'react-native-shimmer-placeholder'
import styled from 'styled-components/native'
import { Colors, Typography } from '../../theming'
import { InfiniteFlatList } from '../InfiniteFlatList'
import { SHIMMER_COLORS } from '../Layout/Layout.style'

export type FormOptionType = {
    value: any
    body?: string
}

interface InputOptionsProps {
    header?: ReactElement
    options: any[]
    selectedOption?: any
    loading?: boolean
    shimmers?: number
    verticalOptionPadding?: number
    horizontalOptionPadding?: number
    onSelect?(option: any): void
    renderOption(item: any): FormOptionType
}

export const InputOptions: FC<InputOptionsProps> = ({ 
    header,
    selectedOption,
    onSelect,
    options,
    loading,
    shimmers = 10,
    verticalOptionPadding = 10,
    horizontalOptionPadding = 10,
    renderOption
}) => {
    
    const _render = useCallback(({ item }: any) => {
        if (loading) {
            return <Shimmer autoRun isInteraction={false} horizontalPadding={horizontalOptionPadding} colorShimmer={SHIMMER_COLORS}/>
        }

        const option = renderOption(item)
        if (JSON.stringify(option.value) === JSON.stringify({})) {
            return null
        }

        const selected = JSON.stringify(option.value) === JSON.stringify(selectedOption)
        const onPress = () => onSelect && onSelect(item)

        return (
            <TouchableNativeFeedback onPress={onPress}>
                <SView verticalPadding={verticalOptionPadding} horizontalPadding={horizontalOptionPadding}>
                    <SRadio selectedColor={Colors.BLACK_2} selected={selected} onPress={onPress}/>
                    <Typography color={selected ? Colors.BLACK_2 : Colors.GRAY_3}>{option.body}</Typography>
                </SView>
            </TouchableNativeFeedback>
        )
    }, [loading, selectedOption])

    return (
        <InfiniteFlatList
            showShimmer={loading}
            numShimmerItens={shimmers}
            ListHeaderComponent={header}
            data={options}
            minLengthToLoadMore={0}
            keyExtractor={(item, key) => `opt${key}`}
            renderItem={_render}/>
    )
}

const SView: any = styled.View`
    padding-left: ${(props: any) => `${props.horizontalPadding}px`};
    padding-right: ${(props: any) => `${props.horizontalPadding}px`};
    padding-top: ${(props: any) => `${props.verticalPadding}px`};
    padding-bottom: ${(props: any) => `${props.verticalPadding}px`};
    flex-direction: row;
`

const SRadio = styled(Radio)`
    margin-right: 15px;
`

const Shimmer: any = styled(ShimmerPlaceHolder)`
    width: 80%;
    height: 25px;
    margin: 10px ${(props: any) => `${props.horizontalPadding}px`};
`