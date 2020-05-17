import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import AppModules from './src/modules/AppModules'

const store = AppModules.register()

const Content = () => {
    AppModules.init()
    return (
        <Text>App</Text>
    )
}

const App = () => (
    <Provider store={store}>
        <Content/>
    </Provider>
)

export default App
