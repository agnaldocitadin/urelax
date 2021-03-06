import bodyParser from 'body-parser'
import compression from 'compression'
import dotenv from 'dotenv-flow'
import express, { Express } from 'express'
import fs from 'fs'
import { ServerOptions } from 'https'
import path from 'path'
import { version } from '../../package.json'
import GraphQL from '../modules/GraphQL'
import Module from '../modules/Module'
import Router from '../modules/Router'
import '../modules/Translation/i18n'
import Logger from './Logger'

/**
 *
 *
 * @class InvestingBotServer
 */
class ServerEntryPoint {

    app: Express
    httpsOptions: ServerOptions

    constructor() {
        dotenv.config()
        this.app = express()

        this.httpsOptions = {
            key: fs.readFileSync(path.resolve(__dirname, "./security/server.key")),
            cert: fs.readFileSync(path.resolve(__dirname, "./security/server.cert"))
        }

        process.on("unhandledRejection", (error: Error) => Logger.print(error, Logger.error, "[unhandledRejection]"))
        process.on("uncaughtException", (error: Error) => Logger.print(error, Logger.error, "[uncaughtException]"))
    }
    
    /**
     *
     *
     * @static
     * @memberof Server
     */
    static run() {
        new ServerEntryPoint().start()
    }
    
    /**
     *
     *
     * @private
     * @returns {Promise<void>}
     * @memberof Server
     */
    private async init(): Promise<void> {
        this.app.use(bodyParser.json())
        Logger.info("Http body parser: %s", "body-parser[JSON]")
        this.app.use(compression())
        await Module.initModules(this.app)
        await GraphQL.initGraphQLSchema(this.app)
        await Router.registerRoutes(this.app)
    }

    /**
     *
     *
     * @private
     * @memberof HoneycombServer
     */
    private logServerConfs() {
        Logger.info("Launching Honeycomb Server, version %s", version)
        Logger.info("Enviroment: %s", process.env.PRODUCTION_MODE === "true" ? "PRODUCTION" : "DEVELOPMENT")
        Logger.info("OS: %s", process.env.OS)
        Logger.info("Platform: %s", process.platform)
        Logger.info("Processors: %s", process.env.NUMBER_OF_PROCESSORS)
        Logger.info("Processor architecture: %s", process.env.PROCESSOR_ARCHITECTURE)
        Logger.info("Processor identifier: %s", process.env.PROCESSOR_IDENTIFIER)
        Logger.info("PLink Protocol: %s", process.env.PLINK_PROTOCOL)
        Logger.info("PWD: %s", process.env.PWD)
        Logger.info("Node: %s", process.version)
    }

    /**
     *
     *
     * @returns {Promise<void>}
     * @memberof Server
     */
    async start(): Promise<void> {
        this.logServerConfs()
        await this.init()
        const hostname = process.env.HOST_ADDRESS
        const port = Number.parseInt(process.env.PORT)
        this.app.listen(port, hostname, () => Logger.info(`Host:[${hostname}:${port}] Server started successfully.`))
        // https.createServer(this.httpsOptions, this.app).listen(3002, "0.0.0.0", () => Logger.info("Server started. Host:[0.0.0.0:3002]"))
    }
}

ServerEntryPoint.run()