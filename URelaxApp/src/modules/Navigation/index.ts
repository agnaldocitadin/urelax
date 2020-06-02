import { useSelector } from 'react-redux'
import actions, { ReducerState } from './actions'
import { Navigator } from './Navigator'
import reducer from './reducer'

const MODULE_NAME = "Navigation"

type StateProperties = keyof ReducerState

const select = (property: StateProperties) => useSelector((state: any) => state[MODULE_NAME][property])

const init = () => {}

export default {
    MODULE_NAME,
    init,
    ...{
        Navigator
    },
    select,
    actions,
    reducer
}