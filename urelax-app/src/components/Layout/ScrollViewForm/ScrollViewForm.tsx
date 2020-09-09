
import React, { FC } from 'react'
import { FlexStyle, View, ViewStyle } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

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
        <View style={style}>
            {children}
        </View>
    </ScrollView>
)