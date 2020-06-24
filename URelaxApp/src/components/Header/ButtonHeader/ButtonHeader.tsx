import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors } from '../../../theming'
import { BaseButton } from '../../BaseButton'

export interface ButtonHeaderProps {
    icon: string,
    color?: string,
    onPress?(): void
}

export const ButtonHeader: FC<ButtonHeaderProps> = ({ icon, color = Colors.BLACK_2, onPress }) => (
    <Button onPress={onPress}>
        <Icon name={icon} color={color} size={23}/>
    </Button>
)

const Button = styled(BaseButton)`
    border-radius: 25px;
    width: 45px;
    height: 45px;
`