import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import ActivityHistoryModule from './src/modules/ActivityHistoryModule'
import AppModules from './src/modules/AppModules'
import BrokerModule from './src/modules/BrokerModule'
import { BrokerStartup } from './src/modules/BrokerModule/BrokerStartup'
import DashboardModule from './src/modules/DashboardModule'
import IdentityModule from './src/modules/IdentityModule'
import { IdentityStartup } from './src/modules/IdentityModule/IdentityStartup'
import InvestimentModule from './src/modules/InvestimentModule'
import MessagingModule from './src/modules/MessagingModule'
import { DialogMessage } from './src/modules/MessagingModule/DialogMessage'
import NavigationModule from './src/modules/NavigationModule'
import { Navigator } from './src/modules/NavigationModule/Navigator'
import PresentationModule from './src/modules/PresentationModule'
import SecurityModule from './src/modules/SecurityModule'
import StatementModule from './src/modules/StatementModule'
import StockTrackerModule from './src/modules/StockTrackerModule'
import StorageModule from './src/modules/StorageModule'

enableScreens()

const store = AppModules.register([
    PresentationModule,
    SecurityModule,
    IdentityModule,
    NavigationModule,
    StorageModule,
    MessagingModule,
    DashboardModule,
    ActivityHistoryModule,
    InvestimentModule,
    StockTrackerModule,
    StatementModule,
    BrokerModule
])
    
const App = () => {
    return (
        <Provider store={store}>
            <Navigator/>
            <IdentityStartup/>
            <BrokerStartup/>
            <DialogMessage/>
        </Provider>
    )
}

export default App
