
import { Text, Thumbnail, View } from 'native-base'
import React, { FC } from 'react'
import { ViewStyle } from 'react-native'
import styled from 'styled-components'
import { Colors, Icons, PROFILE, Theme } from '../../../core/Theme'
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
            <Thumbnail source={PROFILE} style={{ width: 50, height: 50 }}/>
            <SProfileName>{name}</SProfileName>
            <InteractiveButton
                block
                borderWidth={1}
                iconColor={Colors.BLUES_2}
                borderColor={Colors.BLUES_2}
                icon={Icons.ACCOUNT_EDIT}
                width={BTN_PROFILE_SIZE}
                height={BTN_PROFILE_SIZE}
                radius={28}
                animate={false}
                onPress={onPress}/>
        </SBoxInline>
    )
}

const SBoxInline = styled(View)`
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`

const SProfileName = styled(Text)`
    color: ${Colors.BLACK_2};
    font-family: ${Theme.FONT_MEDIUM};
    margin-left: 10px;
    flex: 1;
`