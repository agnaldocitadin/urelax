import React, { FC } from "react"
import { ViewStyle } from "react-native"
import styled from "styled-components/native"
import { Typography } from "../../theming"
import { Touchable } from "../Touchable"

interface TouchItemProps {
    text: string
    onPress?(): void
    style?: ViewStyle
}

export const TouchItem: FC<TouchItemProps> = ({ onPress, text, style }) => {
    return (
        <Touchable style={style} onPress={onPress}>
            <TextItem fontSize={16}>{text}</TextItem>
        </Touchable>
    )
}

const TextItem = styled(Typography)`
    padding: 18px 0;
`