import cronstrue from 'cronstrue'
import schedule from 'node-schedule'
import Logger from "../../../core/Logger"

class StockPriceClosing {

    static build() {
        return new StockPriceClosing()
    }

    schedule(): void {
        Logger.info("Stock price closing will run at %s", cronstrue.toString(process.env.STOCK_PRICE_CLOSING_JOB))
        schedule.scheduleJob(process.env.STOCK_PRICE_CLOSING_JOB, () => this.run())
    }

    run(): void {
        // TODO
        console.log("Update stock cloging price!")
    }
}

export const stockPriceClosing = StockPriceClosing.build()