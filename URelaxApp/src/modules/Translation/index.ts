// import actions, { ReducerState } from './actions'
// import reducer from './reducer'
// import { TemplateUI } from './TemplateUI'
import { MODULE_NAME } from './const'


// const MODULE_NAME = "Translation"

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