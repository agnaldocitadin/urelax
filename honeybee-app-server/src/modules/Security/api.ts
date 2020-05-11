import { Express } from 'express'
import { Identity } from '..'
import { ErrorCodes } from '../../core/error.codes'
import { Logger } from '../../core/Logger'
import { invoke } from '../../core/Utils'

export const registerAPI = (app: Express) => {

    app.post("/authenticate", (req, res) => {
        invoke(req, res, async () => {
            const { email, passwd } = req.body
            const user = await Identity.findByEmailPassword(email, passwd)
            if (user) {
                res.json({ user, token: "token"})
                return
            }
            Logger.throw(ErrorCodes.USER_NOT_AUTHORIZED, "User not authorized")
        }, 403)
    })

}