import { Express } from 'express'
import { invoke } from '../../../core/Utils'
import Router, { RouteVersion } from '../../Router'
import { stockTrackerPlayground } from './stock.tracker.playground'

/**
 *
 *
 * @param {Express} app
 */
export const registerAPI = (app: Express) => {

    Router.addRoute({ route: "/playStockTracker", method: "POST", version: RouteVersion.V1, secure: true }, (req, res) => {
        invoke(req, res, async () => {
            const { id } = req.body
            let stockTracker = await stockTrackerPlayground.playInvestor(id)
            res.send({ status: stockTracker.status })
        })
    })

    Router.addRoute({ route: "/pauseStockTracker", method: "POST", version: RouteVersion.V1, secure: true }, (req, res) => {
        invoke(req, res, async () => {
            const { id } = req.body
            let stockTracker = await stockTrackerPlayground.pauseInvestor(id)
            res.send({ status: stockTracker.status })
        })
    })

    Router.addRoute({ route: "/destroyStockTracker", method: "POST", version: RouteVersion.V1, secure: true }, (req, res) => {
        invoke(req, res, async () => {
            const { id } = req.body
            let stockTracker = await stockTrackerPlayground.destroyInvestor(id)
            res.send({ status: stockTracker.status })
        })
    })

}