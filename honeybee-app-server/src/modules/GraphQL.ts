import { Express, Request } from 'express'
import expressGraphql from 'express-graphql'
import { buildSchema } from 'graphql'
import { APIError, Locales } from 'honeybee-api'
import modulePath from '.'
import { ErrorCodes } from '../core/error.codes'
import { tsLng } from '../core/i18n'
import Logger, { MessageError } from '../core/Logger'
import Router, { RouteVersion } from './Router'

export interface GraphQLModule {
    types?: string
    inputs?: string
    queries?: string
    mutations?: string
    resolvers?: object
}

/**
 * TODO Log it!
 *
 * @param {any[]} modules
 * @param {Express} app
 */
const initGraphQLSchema = async (app: Express) => {

    Logger.info("Loading schemas:")

    const scalars = `
        scalar Datetime
    `
    
    let types = ``
    let inputs = ``
    let queries = ``
    let mutations = ``
    let resolvers = {}

    const modules = modulePath.modules
    const moduleNames = Object.keys(modules)
    await Promise.all(moduleNames.map( async (name) => {
        if (module) {
            const moduleSchema = (<any>modules)[name].graphqlSchema
            if (moduleSchema) {
                if (moduleSchema.types) {
                    types = types.concat(moduleSchema.types)
                }

                if (moduleSchema.inputs) {
                    inputs = inputs.concat(moduleSchema.inputs)
                }

                if (moduleSchema.queries) {
                    queries = queries.concat(moduleSchema.queries)
                }
                
                if (moduleSchema.mutations) {
                    mutations = mutations.concat(moduleSchema.mutations)
                }

                if (moduleSchema.resolvers) {
                    resolvers = {...resolvers, ...moduleSchema.resolvers}
                }

                Logger.info("- %s GraphQL schema loaded.", name.toUpperCase())
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

    const graphqlMiddleware = expressGraphql((request: Request) => ({
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

    Router.addRoute({ route: "/graphql", version: RouteVersion.V1 }, graphqlMiddleware)
    Logger.info("GrapQL Schema done.")
}

export default {
    initGraphQLSchema
}