
import { Icon, Input } from 'native-base'
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Colors, Fontsa, Icons } from '../../theming'
import { CORNER_RADIUS, FORM_PADDING } from '../Layout/Layout.style'

interface InputSearchProps {
    placeholder?: string
    textColor?: string
    iconColor?: string
    onChangeText(text: string): void
}

export const InputSearch: FC<InputSearchProps> = ({
    textColor = Colors.BLACK_2,
    iconColor = Colors.BLACK_2,
    placeholder,
    onChangeText
}) => {
    return (
        <SSearch>
            <SSearchIcon color={iconColor} type={Fontsa.ICON_PACK} name={Icons.MAGNIFY}/>
            <SSearchInput placeholder={placeholder} placeholderTextColor={Colors.BLACK_2} color={textColor} onChangeText={onChangeText}/>
        </SSearch>
    )
}

const SSearch = styled.View`
    background-color: ${Colors.WHITE};
    flex-direction: row;
    align-items: center;
    border-top-left-radius: ${CORNER_RADIUS};
    border-top-right-radius: ${CORNER_RADIUS};
    border-bottom-width: 1px;
    border-bottom-color: ${Colors.BLACK_2};
    transform: translateY(-12px);
    padding-left: ${FORM_PADDING};
    padding-right: ${FORM_PADDING};
    height: 60px;
`

const SSearchIcon = styled(Icon)`
    color: ${(props: any) => props.color};
    font-size: 21px;
`

const SSearchInput: any = styled(Input)`
    /* font-family: ${Theme.FONT_MEDIUM}; */
    color: ${(props: any) => props.color};
    font-size: 15px;
`