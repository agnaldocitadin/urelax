import * as modules from './'

const init = () => {
    const moduleNames = Object.keys(modules)
    return Promise.all(moduleNames.map(async (name) => {
        const initFn = (<any>modules)[name].init
        if (initFn) {
            await (<any>modules)[name].init()
        }
    })) 
}

export { init }
