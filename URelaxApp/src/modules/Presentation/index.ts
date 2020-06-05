import actions from './actions'
import { MODULE_NAME } from './const'
import reducer, { select } from './reducer'
import { TourUI } from './TourUI'

export default {
    MODULE_NAME,
    ...{
        TourUI
    },
    select,
    actions,
    reducer
}