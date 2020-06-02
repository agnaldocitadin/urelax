import actions from './actions'

const MODULE_NAME = "Storage"

const init = () => actions().initStorage()

export default {
    MODULE_NAME,
    init,
    actions
}