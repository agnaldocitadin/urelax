import { Express, Request, Response } from 'express'
import { APIError, Locales } from 'honeybee-api'
import { ErrorCodes } from "../core/error.codes"
import { tsLng } from '../core/i18n'
import Logger, { MessageError } from "../core/Logger"
import { stockTrackerPlayground } from "../modules/Stock/trackers/stock.tracker.playground"
import { findByEmailPassword } from "../modules/Identity/services/profile.service"
import { expressGraphqlConfig } from "./graphql"

/**
 *
 *
 * @param {*} app
 */
export const registerAPI = (app: Express) => {

    app.use("/graphql", expressGraphqlConfig)

    // app.post("/authenticate", (req, res) => {
    //     invoke(req, res, async () => {
    //         const { email, passwd, simulation } = req.body
    //         const user = await findByEmailPassword(email, passwd, simulation)
    //         if (user) {
    //             res.json({ user, token: "token"})
    //             return
    //         }
    //         Logger.throw(ErrorCodes.USER_NOT_AUTHORIZED, "User not authorized")
    //     }, 403)
    // })

    // app.post("/playStockTracker", (req, res) => {
    //     invoke(req, res, async () => {
    //         const { id } = req.body
    //         let stockTracker = await stockTrackerPlayground.playInvestor(id)
    //         res.send({ status: stockTracker.status })
    //     })
    // })

    // app.post("/pauseStockTracker", (req, res) => {
    //     invoke(req, res, async () => {
    //         const { id } = req.body
    //         let stockTracker = await stockTrackerPlayground.pauseInvestor(id)
    //         res.send({ status: stockTracker.status })
    //     })
    // })
    
    // app.post("/destroyStockTracker", (req, res) => {
    //     invoke(req, res, async () => {
    //         const { id } = req.body
    //         let stockTracker = await stockTrackerPlayground.destroyInvestor(id)
    //         res.send({ status: stockTracker.status })
    //     })
    // })

    Logger.info("API OK")
}
