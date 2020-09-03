import { Express } from 'express'
import { ModuleEntry } from '../Module'
import graphqlSchema from './graphql'

const init = async (app: Express) => {}

const entry: ModuleEntry = {
    init,
    graphqlSchema
}

export default entry