import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import Activity from './src/modules/Activity'
import AppModules from './src/modules/AppModules'
import Dashboard from './src/modules/Dashboard'
import FinancialMoviment from './src/modules/FinancialMoviment'
import Identity from './src/modules/Identity'
import { IdentityStartup } from './src/modules/Identity/IdentityStartup/IdentityStartup'
import Investiment from './src/modules/Investiment'
import Messaging from './src/modules/Messaging'
import { DialogMessage } from './src/modules/Messaging/DialogMessage'
import Navigation from './src/modules/Navigation'
import { Navigator } from './src/modules/Navigation/Navigator'
import Security from './src/modules/Security'
import StockTracker from './src/modules/StockTracker'
import Storage from './src/modules/Storage'

enableScreens()

const store = AppModules.register([
    Security,
    Identity,
    Navigation,
    Storage,
    Messaging,
    Dashboard,
    Activity,
    Investiment,
    StockTracker,
    FinancialMoviment
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
