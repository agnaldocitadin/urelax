import { useSelector } from 'react-redux'
import actions, { ReducerState } from './actions'
import reducer from './reducer'

const MODULE_NAME = "Identity"

type StateProperties = keyof ReducerState

const select = (property: StateProperties) => useSelector((state: any) => state[MODULE_NAME][property])

const init = () => {}

export default {
    MODULE_NAME,
    init,
    ...{
    },
    select,
    actions,
    reducer
}