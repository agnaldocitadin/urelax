import pino, { LogFn } from 'pino'
import { ErrorCodes } from './error.codes'

export type MessageError = {
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
        const error: MessageError = { code, message, args }
        throw Error(JSON.stringify(error))
    },

    print: (error: Error, levelFn: Function, prefix: string = "") => {
        try {
            let errorParsed: MessageError = JSON.parse(error.message)
            let msg = `${prefix}ERRCODE: ${errorParsed.code}`
            levelFn(error, msg)
        }
        catch(e) {
            levelFn(error, prefix)
        }
    },

}

export default Logger