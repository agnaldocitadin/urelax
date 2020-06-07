import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import AppModules from './src/modules/AppModules'
import Identity from './src/modules/Identity'
import Messaging from './src/modules/Messaging'
import { DialogMessage } from './src/modules/Messaging/DialogMessage'
import Navigation from './src/modules/Navigation'
import { Navigator } from './src/modules/Navigation/Navigator'
import Security from './src/modules/Security'
import Storage from './src/modules/Storage'

enableScreens()

const store = AppModules.register([
    Security,
    Identity,
    Navigation,
    Storage,
    Messaging
])
    
/**
 *
 *
 * @returns
 */
const App = () => {
    return (
        <Provider store={store}>
            <Navigator/>
            <DialogMessage/>
        </Provider>
    )
}

export default App
