import { Express } from 'express'
import { ModuleEntry } from '../Module'
import graphqlSchema from './graphql'
import { stockWatcher } from './plugins'
import { StrategyFactory } from './strategies'
import { registerAPI, stockTrackerPlayground } from './trackers'
import { stockPriceClosing } from './trackers/stock.price.closing'

const init = async (app: Express) => {
    registerAPI(app)
    stockTrackerPlayground.schedule()
    stockWatcher.schedule()
    stockPriceClosing.schedule()
    await StrategyFactory.init()
}

const entry: ModuleEntry = {
    init,
    graphqlSchema
}

export default entry