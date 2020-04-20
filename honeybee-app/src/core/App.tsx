import { API } from 'honeybee-api'
import React from 'react'
import 'react-native-gesture-handler'
import { enableScreens } from 'react-native-screens'
import { Provider } from 'react-redux'
import AppContainer from './AppContainer'
import AppConfig from './AppConfig'
import { NotificationListener } from '../modules/notification'
import { store } from '../store'

console.disableYellowBox = true
enableScreens()

API.configure({
    serverURI: AppConfig.URL_REST_SERVER,
    graphqlURI: AppConfig.URL_GRAPHQL_SERVER
})

const App = () => {
    return (
        <Provider store={store}>
            <NotificationListener/>
            <AppContainer/>
        </Provider>
    )
}

export default App
