import { combineReducers, createStore } from 'redux'
import * as modules from './'

/**
 *
 *
 * @returns
 */
const register = () => {
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