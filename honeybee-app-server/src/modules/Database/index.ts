import { Express } from 'express'
import Mongoose from 'mongoose'
import Logger from '../../core/Logger'
import { ModuleEntry } from '../Module'

const DB_DRIVER = "MongoDB"

const init = async (app: Express) => {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const db = process.env.DB_NAME
    await Mongoose.connect(`mongodb://${host}:${port}/${db}`, {
        useNewUrlParser: true,
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    Logger.info("Database connected to: %s [%s:%s/%s]", DB_DRIVER, host, port, db)
}

const entry: ModuleEntry = {
    init
}

export default entry