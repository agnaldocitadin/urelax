import expressGraphql from 'express-graphql'
import Logger from '../core/Logger'
import { resolvers } from '../graphql/resolvers.graphql'
import { schema } from '../graphql/schema.graphql'

export const expressGraphqlConfig = expressGraphql({
    schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: (err) => {
        try {
            let error = JSON.parse(err.message)
            Logger.print(err, Logger.error)
            return error
        }
        catch(e) {
            Logger.error(err)
            return Logger.encapsulate(err.message)
        }
    }
})