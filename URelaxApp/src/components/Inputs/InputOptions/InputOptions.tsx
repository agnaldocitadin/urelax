import React, { FC, ReactElement, useCallback } from 'react'
import { ListRenderItem, ViewProps, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors, DEFAULT_HORIZONTAL_SPACING } from '../../../theming'
import { InfiniteFlatList } from '../../InfiniteFlatList'
import { Touchable } from '../../Touchable'
import { InputRadio } from '../InputRadio/InputRadio'

export type FormOptionType<T> = {
    value: T
    body: ReactElement
}

interface InputOptionsProps<T> {
    options: T[]
    header?: ReactElement
    selectedOption?: T
    style?: ViewStyle
    onSelect?(option: T): void
    renderOption(item: T, checked: boolean): FormOptionType<T>
}

export const InputOptions = <T extends {}>({
    header,
    options,
    selectedOption,
    style,
    onSelect,
    renderOption
}: InputOptionsProps<T>) => {
    
    const _renderItem: ListRenderItem<T> = useCallback(({ item }) => {
        const option = renderOption(item, false)
        const checked = JSON.stringify(option.value) === JSON.stringify(selectedOption)
        return (
            <Option
                style={style}
                checked={checked}
                option={option}
                onPress={() => onSelect && onSelect(item)}/>
        )
    }, [selectedOption])

    return (
        <InfiniteFlatList
            data={options}
            renderItem={_renderItem}
            minLengthToLoadMore={0}
            ListHeaderComponent={header}
            keyExtractor={(item, key) => `opt${key}`}/>
    )
}


interface OptionProps extends ViewProps {
    checked: boolean
    option: FormOptionType<any>
    disabled?: boolean
    onPress?(): void
}

export const Option: FC<OptionProps> = ({ style, checked, disabled, option, onPress }) => (
    <Touchable
        disabled={disabled}
        onPress={onPress}
        borderless={false}>
        <Content style={style}>
            <Radio 
                value={option.value}
                color={disabled ? Colors.GRAY_4 : "gray"}
                checkedColor={disabled ? Colors.GRAY_4 : Colors.BLUES_3}
                checked={checked}/>
                {option.body}
        </Content>
    </Touchable>
)

const Content = styled.View`
    flex-direction: row;
    align-items: center;
`

const Radio = styled(InputRadio)`
    margin-right: ${DEFAULT_HORIZONTAL_SPACING}px;
`