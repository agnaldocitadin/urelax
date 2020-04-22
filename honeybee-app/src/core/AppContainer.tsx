import { Root } from 'native-base'
import React from 'react'
import { View } from 'react-native'
import styled from 'styled-components'
import { DialogMessage } from '../modules/message'
import Navigator from '../navigations/Navigator'
import { Colors } from './Theme'

const AppContainer = () => {
    return (
        <AppBackground>
            <Root>
                <Navigator/>
                <DialogMessage/>
            </Root>
        </AppBackground>
    )
}

const AppBackground = styled(View)`
    background-color: ${Colors.WHITE};
    flex: 1;
`

export default AppContainer