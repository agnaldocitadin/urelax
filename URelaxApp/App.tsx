import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import Activity from './src/modules/Activity'
import AppModules from './src/modules/AppModules'
import Dashboard from './src/modules/Dashboard'
import FinancialMoviment from './src/modules/FinancialMoviment'
import Identity from './src/modules/Identity'
import { useStartupHook } from './src/modules/Identity/Startup/StartupHook'
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
            <Opa/>
        </Provider>
    )
}

const Opa = () => {
    useStartupHook()
    return null
}

export default App
