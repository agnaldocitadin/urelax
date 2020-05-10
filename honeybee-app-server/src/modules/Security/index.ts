import { Express } from 'express'
import { registerAPI } from './api'

const init = (app: Express) => registerAPI(app)

export default {
    init,
}