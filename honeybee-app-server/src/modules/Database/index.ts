import Mongoose from 'mongoose'
import { Logger } from '../../core/Logger'

export default {
    init: async () => {
        const host = process.env.DB_HOST
        const port = process.env.DB_PORT
        const db = process.env.DB_NAME
        await Mongoose.connect(`mongodb://${host}:${port}/${db}`, {
            useNewUrlParser: true,
            useFindAndModify: false,
            useUnifiedTopology: true
        })
        Logger.info("Connection to database established: [%s:%s/%s]", host, port, db)
    }
}