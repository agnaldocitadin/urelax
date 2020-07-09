import React, { FC, ReactElement } from 'react'
import { View, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { DEFAULT_HORIZONTAL_SPACING, DEFAULT_VERTICAL_SPACING } from '../../theming'
import { TouchableProps } from '../Touchable'
import { TouchItem } from '../TouchItem'

interface InfoProps extends TouchableProps {
    title: ReactElement
    description?: ReactElement
    style?: ViewStyle
}

export const Info: FC<InfoProps> = ({
    title,
    description,
    style,
    ...others
}) => {

    const child = (
        <React.Fragment>
            { title }
            { description }
        </React.Fragment>
    )

    const touchable = others.onPress || others.onPressIn || others.onPressOut || others.onLongPress
    const info = touchable ? <Item {...others} style={style}><View>{ child }</View></Item> : <Content style={style}>{ child }</Content>
    
    return (
        <View>
            { info }
        </View>
    )
}

const Item = styled(TouchItem)`
    padding: ${DEFAULT_VERTICAL_SPACING}px 0;
`

const Content = styled.View`
    padding: ${DEFAULT_VERTICAL_SPACING}px 0;
`