export type DispatchType<T> = {
    type: T,
    payload?: any
}

/**
 *
 *
 * @param {*} initialState
 * @param {object} actions
 * @returns
 */
const createReducer = <A>(initialState: any, actions: A) => {
    return (state: any = initialState, action: DispatchType<A>, ) => {
        const fn = (<any>actions)[action.type]
        return fn ? fn(state, action.payload) : state
    }
}

export default {
    createReducer
}