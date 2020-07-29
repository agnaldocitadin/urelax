import { Express } from 'express'
import { ModuleEntry } from '../Module'
import graphqlSchema from './graphql'
import { financialOpening } from './services'

const init = async (app: Express) => {
    financialOpening.schedule()
}

const entry: ModuleEntry = {
    init,
    graphqlSchema
}

export default entry