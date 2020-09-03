import { Express, NextFunction, Request, Response } from 'express'
import Logger from '../core/Logger'

export enum RouteVersion {
    V1 = "v1"
}

type RouteFunction = (req: Request, res: Response, next: NextFunction) => any

type RouteOptions = { 
    version: RouteVersion, 
    route: string,
    method?: "POST" | "GET"
    secure?: boolean 
}

const routesMap = new Map<RouteVersion, Map<RouteOptions, RouteFunction>>()

/**
 *
 *
 * @param {RouteOptions} option
 * @returns
 */
const buildRoute = (option: RouteOptions) => {
    if (option.secure) return `/${option.version}/secure${option.route}`
    return `/${option.version}${option.route}`
}

/**
 *
 *
 * @param {Express} app
 * @param {RouteOptions} option
 * @param {RouteFunction} fn
 */
const register = (app: Express, option: RouteOptions, fn: RouteFunction) => {
    const route = buildRoute(option)
    Logger.info(` -> Route built @ ${process.env.HOST_ADDRESS}:${process.env.PORT}${route}`)
    switch (option.method) {
        case "GET":
            app.get(route, fn)
            break
        
        case "POST":
            app.post(route, fn)
            break
            
        default:
            app.use(route, fn)
    }
}

export default {
    
    /**
     *
     *
     * @param {RouteOptions} options
     * @param {(req: Request, res: Response, next: NextFunction) => any} fn
     */
    addRoute: (options: RouteOptions, fn: RouteFunction) => {
        let versionRoutes = routesMap.get(options.version)
        if (!versionRoutes) {
            versionRoutes = new Map<RouteOptions, RouteFunction>()
            routesMap.set(options.version, versionRoutes)
        }
        versionRoutes.set(options, fn)
    },

    /**
     *
     *
     * @param {Express} app
     */
    registerRoutes: async (app: Express) => {
        Logger.info("Mapping routes:")
        let cumulativeRoutes = new Map<RouteOptions, RouteFunction>()
        Array.from(routesMap.keys()).sort().forEach(version => {
            let routes = routesMap.get(version)
            routes.forEach((fn, options) => cumulativeRoutes.set(options, fn))
        })

        Array.from(cumulativeRoutes.keys()).forEach(option => {
            const callback = cumulativeRoutes.get(option)
            register(app, option, callback)
        })
    }

}