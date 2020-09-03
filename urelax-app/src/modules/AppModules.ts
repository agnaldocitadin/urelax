import { combineReducers, createStore } from 'redux'

let initialized = false, registered = false

/**
 *
 *
 * @param {any[]} modules
 * @returns
 */
const register = (modules: any[]) => {
    if (registered) throw "You can not register the app modules more than once."
    registered = true

    console.info("Creating module reducers...")
    let reducers = {}
    modules.forEach(module => {
        let moduleReducer = module.reducer
        if (moduleReducer) {
            (<any>reducers)[module.MODULE_NAME] = moduleReducer
            console.info(`Reducer for ${module.MODULE_NAME.toUpperCase()}, created.`)
        }
    })

    const store = createStore(reducers === {} ? {} : <any>combineReducers(reducers))
    init(modules)
    return store
}

/**
 *
 *
 * @param {any[]} modules
 * @returns
 */
const init = (modules: any[]) => {
    if (initialized) throw "You can not initialize the modules app more than once."
    initialized = true

    console.info("Initializing modules...")
    modules.forEach(module => console.info(`${module.MODULE_NAME.toUpperCase()} module found.`))
    return Promise.all(modules.map(async (module) => {
        const initFn = module.init
        if (initFn) {
            await module.init()
        }
    }))
}

export default {
    register
}