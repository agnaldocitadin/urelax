import { Express } from 'express'
import Logger from '../core/Logger'
import { GraphQLModule } from './GraphQL'
import * as models from './index'

export interface ModuleEntry {
    init(app: Express): Promise<void>
    graphqlSchema?: GraphQLModule
}

/**
 *
 *
 * @param {Express} app
 * @returns
 */
const initModules = async (app: Express) => {
    
    Logger.info("Discovering modules...")
    const moduleNames = Object.keys(models)
    moduleNames.forEach(module => Logger.info("- %s module loaded successfully.", module.toUpperCase()))
    Logger.info("Modules discovering done.")

    return Promise.all(moduleNames.map( async (name) => {
        const module = (<any>models)[name]
        if (module.init) {
            await module.init(app)
        }
    }))
}

export default { initModules }
