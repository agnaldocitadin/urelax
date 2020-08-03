import cronstrue from 'cronstrue'
import { TransactionType } from 'honeybee-api'
import schedule from 'node-schedule'
import Logger from "../../../core/Logger"
import { StockTrackerModel } from '../../Stock/models'
import { STOCK_TRACKER_STATUS_INACTIVE } from '../../Stock/services'
import { addTransaction } from './financial.service'

/**
 *
 *
 * @class StockTrackerFinancialOpening
 */
class FinancialOpening {

    static build() {
        return new FinancialOpening()
    }

    schedule(): void {
        Logger.info("(+-) Financial opening will run at %s", cronstrue.toString(process.env.FINANCIAL_OPENING_JOB))
        schedule.scheduleJob(process.env.FINANCIAL_OPENING_JOB, () => this.run())
    }

    async run(): Promise<void> {
        await openStockTrackerHistory()
    }
}

const openStockTrackerHistory = async () => {
    const today = new Date()
    const trackers = await StockTrackerModel.find({ status: { "$nin": STOCK_TRACKER_STATUS_INACTIVE }, qty: { "$gt": 0 }})
    trackers.forEach(async tracker => {
        addTransaction(tracker.getAccountId(), tracker.getBrokerAccountId(), today, {
            type: TransactionType.STATEMENT_OPENING,
            investiment: tracker.getInvestimentId(),
            value: tracker.getNegotiationPrice() * tracker.getQty(),
            dateTime: today
        })
    })
}

export const financialOpening = FinancialOpening.build()