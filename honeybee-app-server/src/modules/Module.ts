import { Express } from 'express'
import fs from 'fs'
import Logger from '../core/Logger'

export interface ModuleEntry {
    
}

/**
 *
 *
 * @returns
 */
const register = () => {
    Logger.info("Loading modules...")
    return Promise.all(fs.readdirSync('./src/modules').map(async (file) => {
        if (!file.endsWith(".js") && !file.endsWith(".ts")) {
            const module = require('./' + file)
            Logger.info("- %s module loaded successfully.", file.toUpperCase())
            return module
        }
    }))
}

/**
 *
 *
 * @param {any[]} modules
 * @param {Express} app
 * @returns
 */
const initModules = async (modules: any[], app: Express) => {
    return Promise.all(modules.map(async (module) => {
        if (module) {
            const defaultEntry = module.default
            if (defaultEntry && defaultEntry.init) {
                await defaultEntry.init(app)
            }
        }
    }))
}

export default { register, initModules }
