import cronstrue from 'cronstrue'
import schedule from 'node-schedule'
import { ClearStockUpdater } from "../modules/Stock/plugins/clear.stock.updater"
import { StockUpdaterPlugin } from '../modules/Stock/plugins/stock.updater.plugin'
import { findAvailables } from '../modules/Stock/services/stock.service'
import Logger from './Logger'

const STOCK_UPDATER_IMPL = ClearStockUpdater

/**
 *
 *
 * @class StockWatcher
 */
class StockWatcher {

    plugin: StockUpdaterPlugin
    running: boolean

    constructor(pluginImpl: StockUpdaterPlugin) {
        this.plugin = pluginImpl
    }

    /**
     *
     *
     * @static
     * @returns
     * @memberof StockWatcher
     */
    static build() {
        const impl = new STOCK_UPDATER_IMPL()
        return new StockWatcher(impl)
    }

    /**
     *
     *
     * @memberof StockWatcher
     */
    schedule(): void {
        if (process.env.STOCKWATCHER_ACTIVE === "true") {
            Logger.info("[> StockWatcher] is going to START at {%s}", cronstrue.toString(process.env.STOCKWATCHER_START))
            Logger.info("[< StockWatcher] is going to STOP at {%s}", cronstrue.toString(process.env.STOCKWATCHER_STOP))
            schedule.scheduleJob(process.env.STOCKWATCHER_START, () => this.start())
            schedule.scheduleJob(process.env.STOCKWATCHER_STOP, () => this.stop())
        }
    }

    /**
     *
     *
     * @private
     * @memberof StockWatcher
     */
    private async start() {
        if (!this.running) {
            this.running = true
            const symbols = await this.fetchSymbols()
            await this.plugin.start(symbols)
            Logger.info("[ === Stock updater is running now. === ]")
        }
    }

    /**
     *
     *
     * @private
     * @memberof StockWatcher
     */
    private async stop() {
        if (this.running) {
            this.running = false
            await this.plugin.stop()
            Logger.info("[ === Stock updater stoped at %s === ]", new Date())
        }
    }

    /**
     *
     *
     * @private
     * @returns {Promise<string[]>}
     * @memberof StockWatcher
     */
    private async fetchSymbols(): Promise<string[]> {
        const stocks = await findAvailables()
        return stocks.map(stock => stock.symbol)
    }

}

export const stockWatcher = StockWatcher.build()