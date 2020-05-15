import { Express } from 'express'
import { ModuleEntry } from '../Module'
import graphqlSchema from './graphql'
import { stockWatcher } from './plugins'
import { StrategyFactory } from './strategies'
import { registerAPI, stockTrackerPlayground } from './trackers'

const init = async (app: Express) => {
    registerAPI(app)
    stockTrackerPlayground.schedule()
    stockWatcher.schedule()
    await StrategyFactory.init()
}

const entry: ModuleEntry = {
    init,
    graphqlSchema
}

export default entry