import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import AppModules from './src/modules/AppModules'
import Identity from './src/modules/Identity'
import Navigation from './src/modules/Navigation'
import Security from './src/modules/Security'
import Storage from './src/modules/Storage'
import { appTheme } from './src/theming'

enableScreens()

const store = AppModules.register([
    Security,
    Identity,
    Navigation,
    Storage
])

/**
 *
 *
 * @returns
 */
const Content = () => {
    return (
        <ThemeProvider theme={appTheme}>
            <Navigation.Navigator/>
        </ThemeProvider>
    )
}
    
/**
 *
 *
 * @returns
 */
const App = () => {
    
    return (
        <Provider store={store}>
            <Content/>
        </Provider>
    )
}

export default App
