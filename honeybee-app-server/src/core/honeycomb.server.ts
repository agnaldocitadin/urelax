import bodyParser from 'body-parser'
import compression from 'compression'
import dotenv from 'dotenv-flow'
import express, { Express } from 'express'
import fs from 'fs'
import { ServerOptions } from 'https'
import { version } from '../../package.json'
import { registerAPI } from '../api/API'
import Auth from '../authentication/Auth'
import { connectDB } from '../db/mongo'
import { PluginFactory } from '../factories/plugin.factory'
import { StrategyFactory } from '../factories/strategy.factory'
import { scheduleBalanceProcessor } from '../services/balance.sheet.service'
import { initFirebaseConfiguration } from './firebase'
import './i18n'
import Logger from './Logger'
import { stockTrackerPlayground } from './stock.tracker.playground'
import { stockWatcher } from './stock.watcher'

/**
 *
 *
 * @class InvestingBotServer
 */
class HoneycombServer {

    app: Express
    httpsOptions: ServerOptions

    constructor() {
        dotenv.config()
        this.app = express()
        
        this.httpsOptions = {
            key: fs.readFileSync("./src/ssl/server.key"),
            cert: fs.readFileSync("./src/ssl/server.cert")
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
        new HoneycombServer().start()
    }
    
    /**
     *
     *
     * @private
     * @returns {Promise<void>}
     * @memberof Server
     */
    private async init(): Promise<void> {
        this.configure()
        await this.initFactories()
        await connectDB()
        registerAPI(this.app)
        initFirebaseConfiguration()
        this.registerSchedules()
    }

    /**
     *
     *
     * @private
     * @memberof HoneycombServer
     */
    private registerSchedules() {
        stockTrackerPlayground.schedule()
        stockWatcher.schedule()
        scheduleBalanceProcessor()
    }

    /**
     *
     *
     * @private
     * @memberof Server
     */
    private configure(): void {
        this.app.use(Auth)
        this.app.use(bodyParser.json())
        this.app.use(compression())
        Logger.info("Http body parser: %s", "body-parser[JSON]")
    }

    /**
     *
     *
     * @private
     * @memberof Server
     */
    private async initFactories(): Promise<void> {
        await PluginFactory.init()
        await StrategyFactory.init()
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

HoneycombServer.run()