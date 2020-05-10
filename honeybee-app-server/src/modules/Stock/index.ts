import { Express } from 'express'
import * as plugins from './plugins'
import * as services from './services'
import * as strategies from './strategies'
import * as trackers from './trackers'
export * from './models'

const init = async (app: Express) => {
    trackers.registerAPI(app)
    trackers.stockTrackerPlayground.schedule()
    plugins.stockWatcher.schedule()
    await strategies.StrategyFactory.init()
}

export default {
    init,
    ...services,
    ...trackers,
    ...plugins,
    ...strategies
}