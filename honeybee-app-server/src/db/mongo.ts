import Mongoose from 'mongoose'
import Logger from '../core/Logger'

/**
 *
 *
 * @returns {Promise<void>}
 */
export const connectDB = (): Promise<void> => {
    const host = process.env.DB_HOST
    const port = process.env.DB_PORT
    const db = process.env.DB_NAME
    return Mongoose.connect(`mongodb://${host}:${port}/${db}`, { 
        useNewUrlParser: true, 
        useFindAndModify: false,
        useUnifiedTopology: true
    })
    .then(() => Logger.info("Connection to database established: [%s:%s/%s]", host, port, db))
}