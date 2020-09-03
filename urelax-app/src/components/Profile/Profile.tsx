
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import { Colors, Icons, TypographyMedium } from '../../theming'
import { InteractiveButton } from '../InteractiveButton'

const BTN_PROFILE_SIZE = 55

interface ProfileProps {
    name: string
    style?: ViewStyle
    onPress(): Promise<void>
}

export const Profile: FC<ProfileProps> = ({ name, onPress, style }) => {
    return (
        <SBoxInline style={style}>
            {/* <Thumbnail source={PROFILE} style={{ width: 50, height: 50 }}/> */}
            <SProfileName color={Colors.BLACK_2}>{name}</SProfileName>
            <InteractiveButton
                block
                normalBgColor={Colors.BLUES_2}
                iconColor={Colors.WHITE}
                icon={Icons.ACCOUNT_EDIT}
                width={BTN_PROFILE_SIZE}
                height={BTN_PROFILE_SIZE}
                radius={28}
                animate={false}
                onPress={onPress}/>
        </SBoxInline>
    )
}

const SBoxInline = styled.View`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const SProfileName = styled(TypographyMedium)`
    margin-left: 10px;
`