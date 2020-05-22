import { Express } from 'express'
import { invoke } from '../../core/Utils'
import Router, { RouteVersion } from '../Router'
import { Profile } from './models'

export const registerAPI = (app: Express) => {

    Router.addRoute({ route: "/signup", method: "POST", version: RouteVersion.V1 }, (req, res) => {
        invoke(req, res, async () => {
            const profile: Profile = req.body
            res.sendStatus(200)
        })
    })

}