import cronstrue from 'cronstrue'
import { startOfDay } from 'date-fns'
import { ProfitType } from 'honeybee-api'
import schedule from 'node-schedule'
import Logger from "../../../core/Logger"
import { addProfit } from '../../Financial/services'
import { StockTrackerModel } from '../models'
import { getLastClosingPrice, STOCK_TRACKER_STATUS_INACTIVE } from '../services'

/**
 *
 *
 * @class StockPriceClosing
 */
class StockPriceClosing {

    static build() {
        return new StockPriceClosing()
    }

    schedule(): void {
        Logger.info("(+-) Closing stock price process will run at %s", cronstrue.toString(process.env.STOCK_PRICE_CLOSING_JOB))
        schedule.scheduleJob(process.env.STOCK_PRICE_CLOSING_JOB, () => this.run())
    }

    async run() {
        const today = startOfDay(new Date())
        const trackers = await StockTrackerModel
            .find({ status: { "$nin": STOCK_TRACKER_STATUS_INACTIVE }, qty: { "$gt": 0 }})
            .populate("stockInfo")

        await Promise.all(trackers.map(async tracker => {
            
            const todaysClosingPrice = await getLastClosingPrice(tracker.getSymbol(), today)
            const baseAmount = tracker.getQty() * tracker.getBuyPrice()
            const currentAmount = tracker.getQty() * todaysClosingPrice
            const profit = currentAmount - baseAmount

            await addProfit(tracker.getBrokerAccountId(), today, {
                investiment: tracker.getInvestimentId(),
                type: ProfitType.YIELD, 
                value: profit
            })
        }))
        Logger.info("-> Closing stock price has been processed for %s tracker(s).")
    }
}

export const stockPriceClosing = StockPriceClosing.build()