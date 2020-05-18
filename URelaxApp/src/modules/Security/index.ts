import { firebase } from '@react-native-firebase/messaging'
import { useSelector } from 'react-redux'
import actions from './actions'
import reducer, { ReducerState } from './reducer'

const MODULE_NAME = "Security"

type StateProperties = keyof ReducerState

const select = (property: StateProperties) => useSelector((state: any) => state[MODULE_NAME][property])

const init = async () => {
    // console.log("--------->>")
    // const permit = await firebase.messaging().hasPermission()
    // if (permit) {
    //     const deviceToken = await firebase.messaging().getToken()
    //     console.debug(deviceToken)
    // }
}

export default {
    MODULE_NAME,
    init,
    ...{
        // TemplateUI
    },
    select,
    actions,
    reducer
}