import { Express } from 'express'
import graphqlSchema from './graphql'
import { PluginFactory } from './plugins'

const init = (app: Express) => {
    return PluginFactory.init()
}

export default {
    init,
    graphqlSchema
}