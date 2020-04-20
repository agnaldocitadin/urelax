
import { Button, Icon } from 'native-base'
import React, { FC } from 'react'
import styled from 'styled-components'
import { Colors, Theme } from '../../../../core/Theme'

export interface ButtonHeaderProps {
    icon: string,
    color?: string,
    onPress?(): void
}

export const ButtonHeader: FC<ButtonHeaderProps> = ({ icon, color = Colors.BLACK_2, onPress }) => (
    <Button style={{ backgroundColor: Colors.TRANSPARENT, elevation: 0 }} rounded onPress={onPress}>
        <StyledCloseIcon color={color} type={Theme.ICON_PACK} name={icon}/>
    </Button>
)

const StyledCloseIcon = styled(Icon)`
    font-size: 21px;
    color: ${(props: any) => props.color ? props.color : "black"};
`