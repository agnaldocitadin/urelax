import { Express } from 'express'
import { inputs, mutations, queries, types } from './graphql'
import { PluginFactory } from './plugins'

const init = (app: Express) => {
    return PluginFactory.init()
}

export default {
    init,
    graphqlSchema: {
        types,
        inputs,
        queries,
        mutations
    }
}