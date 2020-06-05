import actions from './actions'
import { MODULE_NAME } from './const'
import reducer, { select } from './reducer'
import { TemplateUI } from './TemplateUI'

const init = () => {}

export default {
    MODULE_NAME,
    init,
    ...{
        TemplateUI
    },
    select,
    actions,
    reducer
}