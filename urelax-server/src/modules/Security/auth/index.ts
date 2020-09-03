import { Express } from 'express'
import fs from 'fs'
import { APIError } from 'urelax-api'
import passport from 'passport'
import passportjwt from 'passport-jwt'
import path from 'path'
import { ErrorCodes } from '../../../core/error.codes'
import Logger from '../../../core/Logger'
import './public.key'

let publicKey: Buffer

/**
 *
 *
 */
const configureJWTStrategy = () => {
    if (!publicKey) publicKey =  fs.readFileSync(path.resolve(__dirname, "./security/public.key"))
    passport.use(new passportjwt.Strategy({ 
            secretOrKey: publicKey,
            algorithms: ["RS256"],
            ignoreExpiration: true,
            jwtFromRequest: passportjwt.ExtractJwt.fromAuthHeaderAsBearerToken() 
        },
        (payload, done) => done(null, payload))
    )
}

/**
 *
 *
 * @param {Express} app
 */
const applySecurity = (app: Express) => {
    if (process.env.USE_SECURITY !== "true") {
        Logger.warn("!! WARNNING Server security is disabled !! ")
        return
    }

    app.use("*/secure", (req, res, next) => {
        passport.authenticate("jwt", (err, payload, info) => {
            if (payload.profile) {
                return next()
            }
            res.status(401).send({ code: ErrorCodes.INVALID_AUTHORIZATION_TOKEN } as APIError)
        })(req, res, next)
    })
}

export default {
    applySecurity: (app: Express) => {
        app.use(passport.initialize())
        configureJWTStrategy()
        applySecurity(app)
    }
}