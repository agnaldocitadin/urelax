import fs from 'fs'
import Logger from '../core/Logger'

/**
 *
 *
 * @returns
 */
const register = () => {
    return Promise.all(fs.readdirSync('./src/modules').map(async (file) => {
        if (!file.endsWith(".js") && !file.endsWith(".ts")) {
            const module = await import('./' + file)
            Logger.info(`- ${file.toUpperCase()} module loaded successfully.`)
            return module
        }
    }))
}

/**
 *
 *
 * @param {any[]} modules
 * @returns
 */
const initModules = async (modules: any[]) => {
    return Promise.all(modules.map(async (module) => {
        if (module) {
            const defaultEntry = module.default
            if (defaultEntry && defaultEntry.init) {
                await defaultEntry.init()
            }
        }
    }))
}

export default { register, initModules }
