import pino, { LogFn } from 'pino'
import { ErrorCodes } from './error.codes.d'

export type BaseError = {
    code: ErrorCodes
    message?: string
    args?: any[]
}

const Pino = pino({
    level: process.env.DEBUG_LEVEL || "debug",
    prettyPrint: {
        translateTime: true,
        colorize: true,
        crlf: true
    }
})

const trace: LogFn = (obj: Object, msg?: string, ...args: any[]) => {
    if (typeof obj !== "string") {
        Pino.trace(obj, msg, ...args)
        return
    }
    msg ? Pino.trace(obj, msg, ...args) : Pino.trace(obj)
}

const debug: LogFn = (obj: Object, msg?: string, ...args: any[]) => {
    if (typeof obj !== "string") {
        Pino.debug(obj, msg, ...args)
        return
    }
    msg ? Pino.debug(obj, msg, ...args) : Pino.debug(obj)
}

const info: LogFn = (obj?: Object, msg?: string, ...args: any[]) => {
    if (typeof obj !== "string") {
        Pino.info(obj, msg, ...args)
        return
    }
    msg ? Pino.info(obj, msg, ...args) : Pino.info(obj)
}

const warn: LogFn = (obj: Object, msg?: string, ...args: any[]) => {
    if (typeof obj !== "string") {
        Pino.warn(obj, msg, ...args)
        return
    }
    msg ? Pino.warn(obj, msg, ...args) : Pino.warn(obj)
}

const error: LogFn = (obj: Object, msg?: string, ...args: any[]) => {
    if (typeof obj !== "string") {
        Pino.error(obj, msg, ...args)
        return
    }
    msg ? Pino.error(obj, msg, ...args) : Pino.error(obj)
}

const fatal: LogFn = (obj: Object, msg?: string, ...args: any[]) => {
    if (typeof obj !== "string") {
        Pino.fatal(obj, msg, ...args)
        return
    }
    msg ? Pino.fatal(obj, msg, ...args) : Pino.fatal(obj)
}

export const Logger = {

    trace,
    debug,
    info,
    warn,
    error,
    fatal,

    throw: (code: ErrorCodes, message?: string, args?: any[]) => {
        throw Error(JSON.stringify({ code, message, args }))
    },

    encapsulate: (error: string, args?: any[]): BaseError => {
        return { code: ErrorCodes.UNKNOWN, message: error, args }
    },

    print: (error: any, levelFn: Function) => {
        try {
            let def: BaseError = JSON.parse(error.message)
            let msg = `Error code: ${def.code}${def.message ? ` (${def.message})` : ""}`
            def.args && def.args.length > 0 ? levelFn(error, msg, def.args) : levelFn(error, msg)
        }
        catch(e) {
            levelFn(error)
        }
    },

}

export default Logger