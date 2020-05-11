import { Express } from 'express'
import { PluginFactory } from './plugins'

const init = (app: Express) => {
    return PluginFactory.init()
}

export default {
    init
}