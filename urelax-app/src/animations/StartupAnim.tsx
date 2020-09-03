import React, { FC } from "react"
import { useWindowDimensions } from "react-native"
import Animated, { Easing, set, useCode, Value } from 'react-native-reanimated'
import { timing } from "react-native-redash"
import styled from "styled-components"

const { View } = Animated

interface Props {
    show: boolean
    bgColor?: string
}

export const StartupAnim: FC<Props> = ({ show, bgColor, children }) => {

    const { width } = useWindowDimensions()
    const offset = new Value(width)
    
    useCode(() => show &&
        set(offset, timing({
            from: offset,
            to: 0,
            duration: 190,
            easing: Easing.out(Easing.sin)
    })), [show])
    
    return (
        <Content bgColor={bgColor} style={{ transform: [{ translateX: offset }] }}>
            {children}
        </Content>
    )
}

const Content: any = styled(View)`
    flex: 1;
    background-color: ${({ bgColor }: any) => bgColor || "white"};
`