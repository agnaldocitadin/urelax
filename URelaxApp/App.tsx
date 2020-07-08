import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import ActivityHistory from './src/modules/ActivityHistory'
import AppModules from './src/modules/AppModules'
import Dashboard from './src/modules/Dashboard'
import Identity from './src/modules/Identity'
import { IdentityStartup } from './src/modules/Identity/IdentityStartup/IdentityStartup'
import Investiment from './src/modules/Investiment'
import Messaging from './src/modules/Messaging'
import { DialogMessage } from './src/modules/Messaging/DialogMessage'
import Navigation from './src/modules/Navigation'
import { Navigator } from './src/modules/Navigation/Navigator'
import Security from './src/modules/Security'
import Statement from './src/modules/Statement'
import StockTrackerModule from './src/modules/StockTrackerModule'
import Storage from './src/modules/Storage'

enableScreens()

const store = AppModules.register([
    Security,
    Identity,
    Navigation,
    Storage,
    Messaging,
    Dashboard,
    ActivityHistory,
    Investiment,
    StockTrackerModule,
    Statement
])
    
const App = () => {
    return (
        <Provider store={store}>
            <Navigator/>
            <IdentityStartup/>
            <DialogMessage/>
        </Provider>
    )
}

export default App
