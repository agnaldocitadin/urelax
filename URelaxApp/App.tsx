import React from 'react'
import { Text } from 'react-native'
import { Provider } from 'react-redux'
import AppModules from './src/modules/AppModules'

const Content = () => {
    AppModules.init()
    return (
        <Text>ASD</Text>
    )
}
    
const App = () => {
    const store = AppModules.register()
    return (
        <Provider store={store}>
            <Content/>
        </Provider>
    )
}

export default App
