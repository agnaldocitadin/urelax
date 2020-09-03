import { Express } from 'express'
import { ProfileInput } from 'honeybee-api'
import { invoke } from '../../core/server-utils'
import Router, { RouteVersion } from '../Router'
import { generateToken } from '../Security/api'
import { createProfile } from './services'

export const registerAPI = (app: Express) => {

    Router.addRoute({ route: "/signup", method: "POST", version: RouteVersion.V1 }, (req, res) => {
        invoke(req, res, async () => {
            const input: ProfileInput = req.body
            const profile = await createProfile(input)
            const token = generateToken(profile)
            res.json({ profile, token })
        })
    })

}