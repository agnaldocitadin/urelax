import actions from './actions'
import { MODULE_NAME } from './const'
import { Navigator } from './Navigator'
import reducer, { select } from './reducer'

export default {
    MODULE_NAME,
    ...{
        Navigator
    },
    select,
    actions,
    reducer
}