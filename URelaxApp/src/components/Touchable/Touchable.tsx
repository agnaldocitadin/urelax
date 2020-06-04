
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components'
import { Colors, Icons } from '../../theming'
import { BaseButton } from '../BaseButton'

interface TouchableProps {
    onPress?(): void
    noChevron?: boolean
    style?: ViewStyle
}

export const Touchable: FC<TouchableProps> = ({ children, noChevron, style, onPress }) => (
    <BaseButton 
        style={style} 
        onPress={onPress} 
        contentStyle={{ justifyContent: "space-between" }}>
        {children}
        {!noChevron && <TouchIcon size={18} color={Colors.BG_2} name={Icons.CHEVRON_RIGHT}/>}
    </BaseButton>
)

const TouchIcon = styled(Icon)`
    margin-left: 5px;
`