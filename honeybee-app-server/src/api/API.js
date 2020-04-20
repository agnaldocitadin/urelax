import Logger from "../core/Logger"
import { stockTrackerPlayground } from "../core/stock.tracker.playground"
import { findByEmailPasswd } from "../services/user.account.service"
import { expressGraphqlConfig } from "./graphql"

/**
 *
 *
 * @param {*} app
 */
export const registerAPI = (app) => {

    app.use("/graphql", expressGraphqlConfig)

    app.get("/authenticate", async (req, res) => {
        const { email, passwd, simulation } = req.query
        const account = await findByEmailPasswd(email, passwd, simulation === "true")
        if (account) {
            res.json(account)
            return
        }
        res.sendStatus(403)
    })

    app.post("/playBee", async (req, res) => {
        invoke(res, async () => {
            const { id } = req.body
            let bee = await stockTrackerPlayground.playInvestor(id)
            res.send({ status: bee.status })
        })
    })

    app.post("/pauseBee", async (req, res) => {
        invoke(res, async () => {
            const { id } = req.body
            let bee = await stockTrackerPlayground.pauseInvestor(id)
            res.send({ status: bee.status })
        })
    })
    
    app.post("/destroyBee", async (req, res) => {
        invoke(res, async () => {
            const { id } = req.body
            let bee = await stockTrackerPlayground.destroyInvestor(id)
            res.send({ status: bee.status })
        })
    })

    Logger.info("API OK")
}

/**
 *
 *
 * @param {*} res
 * @param {*} fn
 */
const invoke = async (res, fn) => {
    try { await fn() }
    catch(e) {
        catchError(res, e)
    }
}

/**
 *
 *
 * @param {*} res
 * @param {*} error
 */
const catchError = (res, error) => {
    try {
        let _error = JSON.parse(error.message)
        Logger.print(error, Logger.error)
        res.status(500).send(_error)
    }
    catch(es) {
        Logger.error(error)
        res.status(500).send(Logger.encapsulate(error.message))
    }
}