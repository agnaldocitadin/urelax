import actions from './actions'
import { MODULE_NAME } from './const'

const init = () => actions().initStorage()

export default {
    MODULE_NAME,
    init,
    actions
}