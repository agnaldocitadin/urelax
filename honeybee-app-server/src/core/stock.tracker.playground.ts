import cronstrue from 'cronstrue'
import { StockTrackerStatus } from 'honeybee-api'
import schedule from 'node-schedule'
import { StockTracker } from '../models/stock.tracker.model'
import { wakeUpInvestor, wakeUpInvestors } from '../services/startup.service'
import { STOCK_TRACKER_STATUS_INACTIVE } from "../services/stock.tracker.service"
import { Investor } from '../stock-tracker/investor'
import Logger from './Logger'

const PLAYGROUND_TICK = 60000

/**
 *
 *
 * @class StockTrackerPlayground
 */
class StockTrackerPlayground {

    investors: Map<string, Investor>
    updateTimer: NodeJS.Timeout
    running: boolean

    constructor() {
        this.investors = new Map()
        this.running = false
    }

    /**
     *
     *
     * @static
     * @returns
     * @memberof StockTrackerPlayground
     */
    static build() {
        return new StockTrackerPlayground()
    }

    /**
     *
     *
     * @memberof StockTrackerPlayground
     */
    schedule(): void {
        if (process.env.STOCKTRACKER_PLAYGROUND_ACTIVE) {
            Logger.info("[> StockTracker playground] is going to START at {%s}", cronstrue.toString(process.env.STOCKTRACKER_PLAYGROUND_START))
            Logger.info("[< StockTracker playground] is going to STOP at {%s}", cronstrue.toString(process.env.STOCKTRACKER_PLAYGROUND_STOP))
            schedule.scheduleJob(process.env.STOCKTRACKER_PLAYGROUND_START, () => this.start())
            schedule.scheduleJob(process.env.STOCKTRACKER_PLAYGROUND_STOP, () => this.stop())
        }
    }

    /**
     *
     *
     * @returns {boolean}
     * @memberof StockTrackerPlayground
     */
    start(): boolean {
        if (this.isRunning()) return false
        this.running = true
        this.wakeUpActiveStockTrackers()
        this.updateTimer = setInterval(() => this.update(), PLAYGROUND_TICK)
        Logger.info("[ === Stock tracker playground is running now. === ]")
        return true
    }

    /**
     *
     *
     * @returns {boolean}
     * @memberof StockTrackerPlayground
     */
    stop(): boolean {
        if (!this.isRunning()) return false
        Logger.info("[ === Stock tracker playground stopped at %s === ]", new Date())
        clearInterval(this.updateTimer)
        this.running = false
        this.investors.clear()
        return true
    }

    /**
     *
     *
     * @param {Investor} investor
     * @returns {boolean}
     * @memberof StockTrackerPlayground
     */
    addInvestor(investor: Investor): boolean {
        const id = investor.stockTrackerModel._id.toString()
        Logger.info("@ Investor %s has been attached to playground.", id)
        this.investors.set(id, investor)
        investor.init()
        return true
    }

    /**
     *
     *
     * @param {string} investorId
     * @memberof StockTrackerPlayground
     */
    removeInvestor(investorId: string): void {
        const investor = this.investors.get(investorId)
        if (investor) {
            this.investors.delete(investorId)
            investor.shuttdow()
            Logger.info("@ Investor %s has been dettached from playground.", investorId)
        }
    }

    /**
     *
     *
     * @memberof StockTrackerPlayground
     */
    update(): void {
        const allInvestors = Array.from(this.investors.values())
        const now = new Date()
        const filteredInvestors = allInvestors.filter((investor) => investor.canUpdate(now))
        filteredInvestors.forEach(investor => investor.update(now))
        allInvestors.forEach(investor => this.checkStockTrackerStatus(investor))
        Logger.info("** Stock tracker playground tick [%s tracker(s) hit] **", filteredInvestors.length)
    }

    /**
     *
     *
     * @param {string} investorId
     * @returns {boolean}
     * @memberof StockTrackerPlayground
     */
    hasInvestor(investorId: string): boolean {
        return this.investors.has(investorId)
    }

    /**
     *
     *
     * @returns {boolean}
     * @memberof StockTrackerPlayground
     */
    isRunning(): boolean {
        return this.running    
    }

    /**
     *
     *
     * @param {string} investorId
     * @returns {Promise<StockTracker>}
     * @memberof StockTrackerPlayground
     */
    async playInvestor(investorId: string): Promise<StockTracker> {
        let investor = this.investors.get(investorId)
        if (!investor) investor = await wakeUpInvestor(investorId)
        return investor.play()
    }
 
    /**
     *
     *
     * @param {string} investorId
     * @returns {Promise<StockTracker>}
     * @memberof StockTrackerPlayground
     */
    async pauseInvestor(investorId: string): Promise<StockTracker> {
        let investor = this.investors.get(investorId)
        if (!investor) investor = await wakeUpInvestor(investorId)
        return investor.pause()
    }
 
    /**
     *
     *
     * @param {string} investorId
     * @returns {Promise<StockTracker>}
     * @memberof StockTrackerPlayground
     */
    async destroyInvestor(investorId: string): Promise<StockTracker> {
        let investor = this.investors.get(investorId)
        if (!investor) investor = await wakeUpInvestor(investorId)
        return investor.destroy()
    }

    /**
     *
     *
     * @param {StockTracker} stockTracker
     * @memberof StockTrackerPlayground
     */
    refreshInvestor(stockTracker: StockTracker): void {
        let selectedTracker = this.investors.get(stockTracker._id.toHexString())
        if (selectedTracker) {
            selectedTracker.stockTrackerModel.frequency = stockTracker.frequency
            Logger.debug("%s@Stock tracker => Frequency update [%s].", stockTracker._id.toHexString(), stockTracker.frequency)
        }
    }

    /**
     *
     *
     * @private
     * @param {Investor} investor
     * @memberof StockTrackerPlayground
     */
    private checkStockTrackerStatus(investor: Investor): void {
        if (STOCK_TRACKER_STATUS_INACTIVE.includes((<any>StockTrackerStatus)[investor.stockTrackerModel.status])) {
            this.removeInvestor(investor.stockTrackerModel._id.toString())
        }
    }

    /**
     *
     *
     * @private
     * @returns {Promise<void>}
     * @memberof StockTrackerPlayground
     */
    private async wakeUpActiveStockTrackers(): Promise<void> {
        this.investors.clear()
        const wokeInvestors: any[] = await wakeUpInvestors()
        wokeInvestors.map(investor => stockTrackerPlayground.addInvestor(investor))
        Logger.info("[> %s tracker(s) attached to stock tracker playground]", stockTrackerPlayground.investors.size)
    }

}

export const stockTrackerPlayground = StockTrackerPlayground.build()