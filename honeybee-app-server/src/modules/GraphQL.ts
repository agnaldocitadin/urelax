import { Express, Request } from 'express'
import expressGraphql from 'express-graphql'
import { buildSchema } from 'graphql'
import { APIError, Locales } from 'honeybee-api'
import { ErrorCodes } from '../core/error.codes'
import { tsLng } from '../core/i18n'
import Logger, { MessageError } from '../core/Logger'

/**
 * TODO Log it!
 *
 * @param {any[]} modules
 * @param {Express} app
 */
const initGraphQLSchema = async (modules: any[], app: Express) => {

    const scalars = `
        scalar Datetime
    `
    
    let types = ``
    let inputs = ``
    let queries = ``
    let mutations = ``
    let resolvers = {}

    await Promise.all(modules.map(async (module) => {
        if (module) {
            const defaultEntry = module.default
            if (defaultEntry && defaultEntry.graphqlSchema) {
                
                let gql = await defaultEntry.graphqlSchema

                if (gql.types) {
                    types = types.concat(gql.types)
                }

                if (gql.inputs) {
                    inputs = inputs.concat(gql.inputs)
                }

                if (gql.queries) {
                    queries = queries.concat(gql.queries)
                }
                
                if (gql.mutations) {
                    mutations = mutations.concat(gql.mutations)
                }

                if (gql.resolvers) {
                    resolvers = {...resolvers, ...gql.resolvers}
                }
            }
        }
    }))

    let schema = buildSchema(`
        ${scalars}
        ${types}
        ${inputs}
        ${queries.trim().length > 0 ? `type Query {${queries}}` : ""}
        ${mutations.trim().length > 0 ? `type Mutation {${mutations}}` : ""}
    `)

    Logger.info(schema)

    app.use("/graphql", expressGraphql((request: Request) => ({
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
    })))

    Logger.info("GrapQL Schema done.")
}

export default {
    initGraphQLSchema
}