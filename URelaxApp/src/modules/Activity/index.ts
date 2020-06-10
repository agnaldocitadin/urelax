import actions from './actions'
import { MODULE_NAME } from './const'
import reducer, { select } from './reducer'

const init = () => {}

export default {
    MODULE_NAME,
    init,
    select,
    actions,
    reducer
}