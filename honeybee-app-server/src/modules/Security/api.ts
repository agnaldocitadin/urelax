import { Express } from 'express'
import { ErrorCodes } from '../../core/error.codes'
import Logger from '../../core/Logger'
import { invoke } from '../../core/Utils'
import { findByEmailPassword } from '../Identity/services'

/**
 *
 *
 * @param {Express} app
 */
export const registerAPI = (app: Express) => {

    app.post("/authenticate", (req, res) => {
        invoke(req, res, async () => {
            const { email, passwd } = req.body
            const profile = await findByEmailPassword(email, passwd)
            if (profile) {
                res.json({ profile, token: "token"})
                return
            }
            Logger.throw(ErrorCodes.USER_NOT_AUTHORIZED, "User not authorized")
        }, 403)
    })

}