import { Request } from 'express'
import expressGraphql from 'express-graphql'
import { APIError, Locales } from 'honeybee-api'
import { ErrorCodes } from '../core/error.codes.d'
import { tsLng } from '../core/i18n'
import Logger, { MessageError } from '../core/Logger'
import { resolvers } from '../graphql/resolvers.graphql'
import { schema } from '../graphql/schema.graphql'

export const expressGraphqlConfig = expressGraphql((request: Request) => ({
    schema,
    rootValue: resolvers,
    graphiql: true,
    customFormatErrorFn: (err: Error) => {
        const lang: Locales = <Locales>request.get("language")
        try {
            let me: MessageError = JSON.parse(err.message)
            let translated = tsLng(lang, me.code, me.args)
            Logger.print(err, Logger.error)
            return { code: me.code, message: translated } as APIError
        }
        catch(e) {
            Logger.error(err)
            return { code: ErrorCodes.UNKNOWN, message: tsLng(lang, ErrorCodes.UNKNOWN) } as APIError
        }
    }
}))