import { Express } from 'express'
import fs from 'fs'
import { APIError } from 'honeybee-api'
import passport from 'passport'
import passportjwt from 'passport-jwt'
import path from 'path'
import { ErrorCodes } from '../../../core/error.codes'
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