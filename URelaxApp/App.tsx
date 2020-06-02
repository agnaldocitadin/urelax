import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import { ThemeProvider } from 'styled-components'
import { Navigation } from './src/modules'
import AppModules from './src/modules/AppModules'
import { defaultTheme } from './src/theming'

enableScreens()

/**
 *
 *
 * @returns
 */
const Content = () => {
    AppModules.init()
    return (
        <ThemeProvider theme={defaultTheme}>
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
    const store = AppModules.register()
    return (
        <Provider store={store}>
            <Content/>
        </Provider>
    )
}

export default App
