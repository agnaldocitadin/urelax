import { Express } from 'express'
import { ModuleEntry } from '../Module'

const init = async (app: Express) => {}

const entry: ModuleEntry = {
    init
}

export default entry