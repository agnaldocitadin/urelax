import { Express, NextFunction, Request, Response } from 'express'
import fs from 'fs'
import { APIError } from 'honeybee-api'
import jwt from 'jsonwebtoken'
import path from 'path'
import { ErrorCodes } from '../../../core/error.codes'
import Logger from '../../../core/Logger'
import './public.key'

let publicKey: Buffer

const authorization = (req: Request, res: Response, next: NextFunction) => {

    // Don't verify the autentication route
    if (req.url === "/authenticate") {
        next()
        return
    }

    const token = req.header("Authorization")
    if (!token) {
        return res.status(402).send({ code: ErrorCodes.AUTHORIZATION_TOKEN_NOT_PROVIDED, message: "Authorization token not provided" } as APIError)
    }

    if (!publicKey) {
        publicKey =  fs.readFileSync(path.resolve(__dirname, "./security/public.key"))
    }

    jwt.verify(token, publicKey, { algorithms: ["RS256"] }, error => {
        if (error) return res.status(500).send({ code: ErrorCodes.INVALID_AUTHORIZATION_TOKEN } as APIError)
        next()
    })
}

export default {
    applySecurity: (app: Express) => {
        app.use(authorization)
        Logger.info("Authorization RS256")
    }
}