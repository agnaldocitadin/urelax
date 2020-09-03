import { Express } from 'express'
import fs from 'fs'
import jwt from 'jsonwebtoken'
import path from 'path'
import { ErrorCodes } from '../../core/error.codes'
import Logger from '../../core/Logger'
import { invoke } from '../../core/server-utils'
import { Profile } from '../Identity/models'
import { findByEmailPassword } from '../Identity/services'
import Router, { RouteVersion } from '../Router'
import './auth/private.key'

let privateKey: Buffer

/**
 *
 *
 * @param {Express} app
 */
export const registerAPI = (app: Express) => {

    Router.addRoute({ route: "/authenticate", method: "POST", version: RouteVersion.V1 }, (req, res) => {
        invoke(req, res, async () => {
            const { email, password } = req.body
            const profile = await findByEmailPassword(email, password)

            if (profile) {
                const token = generateToken(profile)
                return res.json({ profile, token })
            }
            
            Logger.throw(ErrorCodes.USER_NOT_AUTHORIZED, "User not authorized")
        }, 401)
    })
}

/**
 *
 *
 * @param {Profile} profile
 * @returns
 */
export const generateToken = (profile: Profile) => {
    if (!privateKey) privateKey = fs.readFileSync(path.resolve(__dirname, "./security/private.key"))
    return jwt.sign({ profile: profile._id }, privateKey, {
        algorithm: "RS256",
        expiresIn: 3000
    })
}