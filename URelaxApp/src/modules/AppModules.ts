import { combineReducers, createStore } from 'redux'
import * as modules from './'

let initialized = false, registered = false

/**
 *
 *
 * @returns
 */
const register = () => {
    if (registered) {
        throw "You can not register the modules more than once."
    }

    registered = true
    console.info("Creating module reducers...")
    let reducers = {}
    const moduleNames = Object.keys(modules)
    moduleNames.forEach(name => {
        let moduleReducer = (<any>modules)[name].reducer
        if (moduleReducer) {
            (<any>reducers)[name] = moduleReducer
            console.info(`Reducer for ${name.toUpperCase()}, created.`)
        }
    })
    return createStore(combineReducers(reducers))
}

/**
 *
 *
 */
const init = () => {
    if (initialized) {
        throw "You can not initialize the modules more than once."
    }

    initialized = true
    console.info("Initializing modules...")
    const moduleNames = Object.keys(modules)
    moduleNames.forEach(module => console.info(`${module.toUpperCase()} module found.`))
    return Promise.all(moduleNames.map(async (name) => {
        const initFn = (<any>modules)[name].init
        if (initFn) {
            await (<any>modules)[name].init()
        }
    }))
}

export default {
    init,
    register
}