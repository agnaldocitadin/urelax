import React, { FC } from 'react'
import { View } from 'react-native'
import { TouchableHighlight } from 'react-native-gesture-handler'
// import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

interface BaseButtonPros {

}

export const BaseButton: FC<BaseButtonPros> = ({ children }) => {
    return (
        <TouchableHighlight>
            <View>
                { children }
            </View>
        </TouchableHighlight>
    )
}