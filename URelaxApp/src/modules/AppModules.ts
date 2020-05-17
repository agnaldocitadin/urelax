import { combineReducers, createStore } from 'redux'
import * as modules from './'

/**
 *
 *
 * @returns
 */
const register = () => {
    let reducers = {}
    const moduleNames = Object.keys(modules)
    moduleNames.forEach(name => {
        let moduleReducer = (<any>modules)[name].reducer
        if (moduleReducer) {
            (<any>reducers)[name] = moduleReducer
        }
    })
    return createStore(combineReducers(reducers))
}

/**
 *
 *
 */
const init = () => {
    const moduleNames = Object.keys(modules)
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