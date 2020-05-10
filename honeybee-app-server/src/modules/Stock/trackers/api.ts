import { Express } from 'express'
import { invoke } from '../../../core/Utils'
import { stockTrackerPlayground } from './stock.tracker.playground'

export const registerAPI = (app: Express) => {

    app.post("/playStockTracker", (req, res) => {
        invoke(req, res, async () => {
            const { id } = req.body
            let stockTracker = await stockTrackerPlayground.playInvestor(id)
            res.send({ status: stockTracker.status })
        })
    })

    app.post("/pauseStockTracker", (req, res) => {
        invoke(req, res, async () => {
            const { id } = req.body
            let stockTracker = await stockTrackerPlayground.pauseInvestor(id)
            res.send({ status: stockTracker.status })
        })
    })
    
    app.post("/destroyStockTracker", (req, res) => {
        invoke(req, res, async () => {
            const { id } = req.body
            let stockTracker = await stockTrackerPlayground.destroyInvestor(id)
            res.send({ status: stockTracker.status })
        })
    })

}