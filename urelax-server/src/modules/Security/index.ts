import { Express } from 'express'
import { ModuleEntry } from '../Module'
import '../Security/ssl/server.cert'
import '../Security/ssl/server.key'
import { registerAPI } from './api'

const init = async (app: Express) => registerAPI(app)

const entry: ModuleEntry = {
    init,
}

export default entry