import { Express } from 'express'
import { stockWatcher } from './plugins'
import { StrategyFactory } from './strategies'
import { registerAPI, stockTrackerPlayground } from './trackers'

const init = async (app: Express) => {
    registerAPI(app)
    stockTrackerPlayground.schedule()
    stockWatcher.schedule()
    await StrategyFactory.init()
}

export default {
    init
}