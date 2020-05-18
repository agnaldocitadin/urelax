import { AppRegistry } from 'react-native'
import App from './App'
import { name as appName } from './app.json'

console.info(`| ===== Initializing App ${appName} ===== |`)
AppRegistry.registerComponent(appName, () => App);
