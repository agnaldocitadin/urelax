/**
 *
 *
 * @param {*} initialState
 * @param {object} actions
 * @returns
 */
const createReducer = (initialState: any, actions: object) => {
    return (state: any = initialState, action: any, ) => {
        const fn = (<any>actions)[action.type]
        return fn ? fn(state) : state
    }
}

export default {
    createReducer
}