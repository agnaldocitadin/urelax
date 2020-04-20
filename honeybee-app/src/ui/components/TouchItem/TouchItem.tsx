import React, { FC } from "react"
import { Text, ViewStyle } from "react-native"
import styled from "styled-components"
import { Theme } from "../../../core/Theme"
import { Touchable } from "../Touchable"

interface TouchItemProps {
    text: string
    onPress?(): void
    style?: ViewStyle
}

export const TouchItem: FC<TouchItemProps> = ({ onPress, text, style }) => {
    return (
        <Touchable style={style} onPress={onPress}>
            <TextItem>{text}</TextItem>
        </Touchable>
    )
}

const TextItem = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    font-size: 16px;
    padding: 18px 0;
`