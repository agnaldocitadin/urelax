import cronstrue from 'cronstrue'
import schedule from 'node-schedule'
import Logger from "../../../core/Logger"

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
        Logger.info("Financial opening will run at %s", cronstrue.toString(process.env.FINANCIAL_OPENING_JOB))
        schedule.scheduleJob(process.env.FINANCIAL_OPENING_JOB, () => this.run())
    }

    run(): void {
        // TODO
        console.log("Generate statement opening!")
    }
}

export const financialOpening = FinancialOpening.build()