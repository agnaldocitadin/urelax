import { Root } from 'native-base'
import React from 'react'
import { DialogMessage } from '../modules/message'
import Navigator from '../navigations/Navigator'

const AppContainer = () => {
    return (
        <Root>
            <Navigator/>
            <DialogMessage/>
        </Root>
    )
}

export default AppContainer
