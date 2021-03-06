import React, { FC } from "react"
import { ViewStyle } from "react-native"
import styled from "styled-components/native"
import { BaseIcon, Colors, Icons } from "../../theming"
import { Touchable, TouchableProps } from "../Touchable"

export interface TouchItemProps extends TouchableProps {
    noChevron?: boolean
    containerBgColor?: string
    style?: ViewStyle
}

export const TouchItem: FC<TouchItemProps> = ({ 
    children,
    style,
    noChevron,
    containerBgColor = Colors.TRANSPARENT,
    borderless = false,
    ...others
}) => {
    return (
        <Container bgColor={containerBgColor}>
            <Touchable {...others} borderless={borderless}>
                <Content style={style}>
                    { children }
                    { !others.disabled && !noChevron && <TouchIcon size={18} color={Colors.BG_2} name={Icons.CHEVRON_RIGHT}/> }
                </Content>
            </Touchable>
        </Container>
    )
}

const Container = styled.View<{ bgColor: string }>`
    background-color: ${({ bgColor }) => bgColor};
`

const Content = styled.View`
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`

const TouchIcon = styled(BaseIcon)`
    margin-left: 5px;
`