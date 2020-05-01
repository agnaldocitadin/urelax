import { AppRegistry } from 'react-native'
import { name as appName } from './app.json'
import App from './src/core/App'

AppRegistry.registerComponent(appName, () => App)

// TODO Background messages
// AppRegistry.registerHeadlessTask("ReactNativeFirebaseMessagingHeadlessTask", () => console.log("Not implemented yet!"))
// firebase.messaging().setBackgroundMessageHandler(async (message) => {
//     console.log("chegou background")
// })