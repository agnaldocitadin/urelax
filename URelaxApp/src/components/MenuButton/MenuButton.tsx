
import { Button, Icon, Text } from "native-base"
import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors, Theme } from '../../../core/Theme'

interface MenuButtonProps {
    icon: string
    label: string
    action(): void
}

export const MenuButton: FC<MenuButtonProps> = ({ icon, label, action }) => {
    return (
        <SMenuButton onPress={action}>
            <SMenuButtonIcon type={Theme.ICON_PACK} name={icon}/>
            <SMenuButtonLabel>{label}</SMenuButtonLabel>
        </SMenuButton>
    )
}

const SMenuButton = styled(Button)`
    flex-direction: column;
    align-items: flex-start;
    background-color: ${Colors.BLUES_2};
    border-radius: 5px;
    padding: 10px 0px;
    margin: 0 10px;
    height: auto;
    flex: 1;
    elevation: 0;
`

const SMenuButtonIcon = styled(Icon)`
    color: ${Colors.WHITE};
`

const SMenuButtonLabel = styled(Text)`
    font-family: ${Theme.FONT_REGULAR};
    font-size: 13px;
    color: ${Colors.WHITE};
`