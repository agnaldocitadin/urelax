
import React, { FC } from 'react'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'
import styled from 'styled-components/native'
import { Colors, Typography } from '../../theming'
import { BaseButton } from '../BaseButton'

interface MenuButtonProps {
    icon: string
    label: string
    action(): void
}

export const MenuButton: FC<MenuButtonProps> = ({ icon, label, action }) => {
    return (
        <Button onPress={action}>
            <Icon color={Colors.WHITE} name={icon}/>
            <Typography fontSize={13} color={Colors.WHITE}>{label}</Typography>
        </Button>
    )
}

const Button = styled(BaseButton)`
    background-color: ${Colors.BLUES_2};
    border-radius: 5px;
    margin: 0 10px;
    height: auto;
    flex: 1;
    /* flex-direction: column; */
    /* align-items: flex-start; */
    /* padding: 10px 0px; */
`