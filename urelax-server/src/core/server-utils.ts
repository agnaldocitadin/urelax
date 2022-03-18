import { Request, Response } from 'express'
import { utils } from 'js-commons'
import { ObjectId } from 'mongodb'
import { APIError, Locales } from 'urelax-api'
import { tsLng } from '../modules/Translation/i18n'
import { ErrorCodes } from './error.codes'
import Logger, { MessageError } from './Logger'

export class DelayedAction {

    id: NodeJS.Timeout

    run(fn: Function, delay: number) {
        if (this.id) this.clear()
        this.id = setTimeout(() => fn(), delay)
    }

    clear() {
        clearTimeout(this.id)
    }

}

export const toObjectId = (field: string, value?: any) => {
    let id = value && new ObjectId(value)
    return utils.nonNull(field, id)
}

/**
 *
 *
 * @param {Request} request
 * @param {Response} response
 * @param {() => Promise<any>} fn
 * @param {number} [status=500]
 */
export const invoke = async (request: Request, response: Response, fn:() => Promise<any>, status: number = 500) => {
    try { 
        await fn()
    }
    catch(e) {
        catchError(request, response, e, status)
    }
}

/**
 *
 *
 * @param {*} response
 * @param {*} error
 */
export const catchError = (request: Request, response: Response, error: Error, status: number) => {
    const lang: Locales = <Locales>request.get("language")
    try {
        let me: MessageError = JSON.parse(error.message)
        let translated = tsLng(lang, me.code, me.args)
        response.status(status).send({ code: me.code, message: translated } as APIError)
        Logger.print(error, Logger.error)
    }
    catch(es) {
        const translated = tsLng(lang, ErrorCodes.UNKNOWN)
        response.status(status).send({ code: ErrorCodes.UNKNOWN, message: translated } as APIError)
        Logger.error(error)
    }
}