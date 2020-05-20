import { Express } from 'express'
import Logger from '../core/Logger'
import { GraphQLModule } from './GraphQL'
import modulePath from './index'

export interface ModuleEntry {
    init(app: Express): Promise<void>
    graphqlSchema?: GraphQLModule
}

export interface ModuleExport {
    prepare(app: Express): Promise<void>
    modules: any
}

/**
 *
 *
 * @param {Express} app
 * @returns
 */
const initModules = async (app: Express) => {

    if (modulePath.prepare) {
        modulePath.prepare(app)
    }
    
    Logger.info("Discovering modules...")
    const moduleNames = Object.keys(modulePath.modules)
    moduleNames.forEach(module => Logger.info("- %s module loaded successfully.", module.toUpperCase()))
    Logger.info("Modules discovering done.")

    return Promise.all(moduleNames.map( async (name) => {
        const module = (<any>modulePath.modules)[name]
        if (module.init) {
            await module.init(app)
        }
    }))
}

export default { initModules }
