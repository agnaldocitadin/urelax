import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Button, Colors } from '../../../theming'

export interface ButtonHeaderProps {
    icon: string,
    color?: string,
    onPress?(): void
}

export const ButtonHeader: FC<ButtonHeaderProps> = ({ icon, color = Colors.BLACK_2, onPress }) => (
    <BaseButton onPress={onPress}>
        <Icon name={icon} color={color} size={23}/>
    </BaseButton>
)

const BaseButton = styled(Button)`
    border-radius: 25px;
    width: 45px;
    height: 45px;
`