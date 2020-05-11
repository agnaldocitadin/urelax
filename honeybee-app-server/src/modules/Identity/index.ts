import { Express } from 'express'
import { inputs, mutations, queries, types } from './graphql'

const init = (app: Express) => {}

export default {
    init,
    graphqlSchema: {
        types,
        inputs,
        queries,
        mutations
    }
}