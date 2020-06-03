
import React, { FC } from 'react'
import styled from 'styled-components/native'
import { Colors, Fontsa } from '../../../theming'
import { BaseButton } from '../../BaseButton'

export interface ButtonHeaderProps {
    icon: string,
    color?: string,
    onPress?(e: any): void
}

export const ButtonHeader: FC<ButtonHeaderProps> = ({ icon, color = Colors.BLACK_2, onPress }) => (
    <BaseButton>
        {/* <StyledCloseIcon color={color} type={Fontsa.ICON_PACK} name={icon}/> */}
    </BaseButton>
)

// const BaseButton = styled.Button`
//     background-color: ${Colors.TRANSPARENT};
//     /* elevation: 0; */
// `

// const StyledCloseIcon = styled(Icon)`
//     font-size: 21px;
//     color: ${(props: any) => props.color ? props.color : "black"};
// `