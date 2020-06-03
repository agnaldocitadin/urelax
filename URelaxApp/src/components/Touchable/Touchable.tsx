
import { Icon, View } from 'native-base'
import React, { FC } from 'react'
import { TouchableNativeFeedback, ViewStyle } from 'react-native'
import styled from 'styled-components'
import { Colors, Icons, Theme } from '../../../core/Theme'

interface TouchableProps {
    onPress?(): void
    noChevron?: boolean
    style?: ViewStyle
}

export const Touchable: FC<TouchableProps> = ({ children, noChevron, style, onPress }) => (
    <TouchableNativeFeedback onPress={onPress}>
        <TouchView style={style}>
            {children}
            {!noChevron && <TouchIcon type={Theme.ICON_PACK} name={Icons.CHEVRON_RIGHT}/>}
        </TouchView>
    </TouchableNativeFeedback>
)

const TouchView = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const TouchIcon = styled(Icon)`
    color: ${Colors.BG_2};
    font-size: 18px;
    margin-left: 5px;
`