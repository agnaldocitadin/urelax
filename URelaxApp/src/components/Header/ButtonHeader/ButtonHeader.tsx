import React, { FC } from 'react'
import styled from 'styled-components/native'
import { BaseIcon } from '../../../theming'
import { BaseButton } from '../../BaseButton'

export interface ButtonHeaderProps {
    icon: string,
    color?: string,
    onPress?(): void
}

export const ButtonHeader: FC<ButtonHeaderProps> = ({
    icon,
    color,
    onPress
}) => (
    <Button onPress={onPress}>
        <BaseIcon name={icon} color={color} size={23}/>
    </Button>
)

const Button = styled(BaseButton)`
    border-radius: 25px;
    width: 45px;
    height: 45px;
`