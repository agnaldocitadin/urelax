import { Express } from 'express'
import { ModuleEntry } from '../Module'
import graphqlSchema from './graphql'
import { PluginFactory } from './plugins'

const init = (app: Express) => {
    return PluginFactory.init()
}

const entry: ModuleEntry = {
    init,
    graphqlSchema
}

export default entry