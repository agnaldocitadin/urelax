import { Express } from 'express'
import * as plugins from './plugins'
import * as services from './services'
export * from './models'

const init = async (app: Express) => {
    await plugins.PluginFactory.init()
}

export default {
    init,
    ...services
}