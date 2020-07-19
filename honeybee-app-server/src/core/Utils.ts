import { set } from 'date-fns'
import { Request, Response } from 'express'
import { APIError, Locales } from 'honeybee-api'
import { ErrorCodes } from './error.codes'
import { tsLng } from './i18n'
import Logger, { MessageError } from './Logger'

export const Utils = {

    Array: {
        lastElements: <T> (array: Array<T>, length: number): Array<T> => {
            return array.slice(array.length - length, array.length)
        },

        lastElement: <T> (array: Array<T>): T => {
            return Utils.Array.lastElements(array, 1)[0]
        },

        firstElements: <T> (array: Array<T>, length: number): Array<T> => {
            return array.slice(0, length)
        }
    },

    Date: {
        today: (): Date => {
            return set(new Date(), { hours: 0, minutes: 0, seconds: 0, milliseconds: 0 })
        }
    },

    Number: {
        toFixed: (value: number, fractionDigits: number): number => {
            return Number(value.toFixed(fractionDigits))
        },
        minMaxScalar: (value: number, min: number, max: number): number => {
            if (max - min === 0) return 1
            return (value - min) / (max - min)
        }
    },

    delayedAction: (): DelayedAction => {
        return new DelayedAction()
    },

    Currency: {
        format: (value: number, prefix: string, decimalScale: number = 2, useCommaDecimalSeparator: boolean = true) => {
            let formated = value.toFixed(decimalScale)
            if (useCommaDecimalSeparator) {
                formated = formated.replace(".", ",")
            }
            return `${prefix} ${formated.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
        }
    },

    sleep: (ms: number) => {
        return new Promise(resolve => setTimeout(resolve, ms))
    }

}

/**
 *
 *
 * @param {number} startValue
 * @param {number} finalValue
 * @returns {number}
 */
export const percentVariation = (startValue: number, finalValue: number): number => {
    return startValue && finalValue && ((finalValue - startValue) / startValue) * 100 || 0
}

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


/**
 *
 *
 * @param {*} obj
 * @param {string} [lastProperty=""]
 * @param {*} [serialization={}]
 * @returns
 */
export const flatObject = (obj: any, lastProperty: string = "", serialization: any = {}) => {
    Object.keys(obj).forEach(field => {
        let value = (<any>obj)[field]
        if (value === undefined) return

        let property = (lastProperty !== "") ? `${lastProperty}.${field}` : `${field}`
        if (value === null) {
            serialization[property] = value
            return
        }

        let toSerialize = typeof value === "object"
        toSerialize ? flatObject(value, property, serialization) : serialization[property] = (<any>obj)[field]
    })

    return serialization
}


/**
 *
 *
 * @template T
 * @param {...object[]} objects
 * @returns {T}
 */
export const mergeObjects = <T>(...objects: object[]): T => {
    const isObject = (obj: any) => obj && typeof obj === 'object'
    
    const deepMergeInner = (target: object, source: object) => {
        Object.keys(source).forEach((key: string) => {
            const targetValue = (<any>target)[key]
            const sourceValue = (<any>source)[key]

            if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
                (<any>target)[key] = targetValue.concat(sourceValue)
            }
            else if (isObject(targetValue) && isObject(sourceValue)) {
                (<any>target)[key] = deepMergeInner(Object.assign({}, targetValue), sourceValue)
            }
            else {
                (<any>target)[key] = sourceValue
            }
        })
        return target
    }

    if (objects.length < 2) {
        throw new Error('deepMerge: this function expects at least 2 objects to be provided')
    }

    if (objects.some(object => !isObject(object))) {
        throw new Error('deepMerge: all values should be of type "object"')
    }

    const target = objects.shift()
    let source: object

    while (source = objects.shift()) {
        deepMergeInner(target, source)
    }

    return target as any
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