import { Express } from 'express'
import { ModuleEntry } from '../Module'
import { registerAPI } from './api'
import graphqlSchema from './graphql'

const init = async (app: Express) => registerAPI(app)

const entry: ModuleEntry = {
    init,
    graphqlSchema
}

export default entry