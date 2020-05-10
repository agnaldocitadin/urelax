import { Express } from 'express'
import * as services from './services'
export * from './models'

const init = (app: Express) => {}

export default {
    init,
    ...services
}