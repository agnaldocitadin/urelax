
import React, { FC } from 'react'
import { FlexStyle, View, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import styled from 'styled-components'
import { FORM_PADDING } from '../Layout.style'

interface ScrollViewFormProps {
    justifyContent?: FlexStyle["justifyContent"]
    style?: ViewStyle
}

export const ScrollViewForm: FC<ScrollViewFormProps> = ({ 
    justifyContent = "flex-start",
    style,
    children 
}) => (
    <ScrollView contentContainerStyle={{ justifyContent, flexGrow: 1 }}>
        <Content style={style}>
            {children}
        </Content>
    </ScrollView>
)

export const Content = styled(View)`
    padding: ${FORM_PADDING};
`