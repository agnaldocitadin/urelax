import React, { FC } from "react"
import { ViewStyle } from "react-native"
import Icon from "react-native-vector-icons/MaterialCommunityIcons"
import styled from "styled-components/native"
import { Colors, Icons } from "../../theming"
import { Touchable, TouchableProps } from "../Touchable"

interface TouchItemProps extends TouchableProps {
    noChevron?: boolean
    style?: ViewStyle
}

export const TouchItem: FC<TouchItemProps> = ({ 
    children,
    style,
    noChevron,
    ...others
}) => {
    return (
        <Container>
            <Touchable {...others}>
                <Content style={style}>
                    { children }
                    { !noChevron && <TouchIcon size={18} color={Colors.BG_2} name={Icons.CHEVRON_RIGHT}/> }
                </Content>
            </Touchable>
        </Container>
    )
}

const Container = styled.View`
    background-color: white;
`

const Content = styled.View`
    justify-content: space-between;
    flex-direction: row;
    align-items: center;
`

const TouchIcon = styled(Icon)`
    margin-left: 5px;
`