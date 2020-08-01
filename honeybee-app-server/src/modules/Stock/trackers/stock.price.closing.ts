import cronstrue from 'cronstrue'
import { ProfitType } from 'honeybee-api'
import schedule from 'node-schedule'
import Logger from "../../../core/Logger"
import { addProfit } from '../../Financial/services'
import { StockTrackerModel } from '../models'
import { getLastClosingPrice, STOCK_TRACKER_STATUS_INACTIVE } from '../services'

class StockPriceClosing {

    static build() {
        return new StockPriceClosing()
    }

    schedule(): void {
        Logger.info("Stock price closing will run at %s", cronstrue.toString(process.env.STOCK_PRICE_CLOSING_JOB))
        schedule.scheduleJob(process.env.STOCK_PRICE_CLOSING_JOB, () => this.run())
    }

    async run() {
        const today = new Date()
        const trackers = await StockTrackerModel
            .find({ status: { "$nin": STOCK_TRACKER_STATUS_INACTIVE }})
            .populate("stockInfo")

        trackers.forEach(async tracker => {
            const lastPrice = await getLastClosingPrice(tracker.getSymbol(), today)

            const firstPrice = tracker.qty * tracker.buyPrice
            const currentPrice = tracker.qty * lastPrice
            tracker.currentPrice = lastPrice
            tracker.save()

            addProfit(
                tracker.getAccountId(),
                tracker.getBrokerAccountId(), 
                today, 
                tracker.getInvestimentId(), 
                ProfitType.YIELD, 
                currentPrice - firstPrice
            )
        })
    }
}

export const stockPriceClosing = StockPriceClosing.build()