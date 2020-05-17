// import actions from './actions'
// import reducer, { ReducerState } from './reducer'
// import { TemplateUI } from './TemplateUI'

const MODULE_NAME = "Security"

// type StateProperties = keyof ReducerState

// const select = (property: StateProperties) => useSelector((state: any) => state[MODULE_NAME][property])

const init = () => {
    // let act = actions()
    // act.addTodo()
}

export default {
    MODULE_NAME,
    init,
    ...{
        // TemplateUI
    },
    // select,
    // actions,
    // reducer
}