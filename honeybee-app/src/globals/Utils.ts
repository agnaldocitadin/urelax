import { DependencyList, useCallback, useEffect } from 'react'
import { InteractionManager } from 'react-native'
import AppConfig from '../core/AppConfig'

interface FNumberConf {
    decimalScale?: number 
    useCommaDecimalSeparator?: boolean
    showSignal?: boolean
}

interface FCurrencyConf extends FNumberConf {
    prefix: string
}

/**
 *
 *
 * @param {number} value
 * @param {FNumberConf} [conf]
 * @returns {string}
 */
export const formatNumber = (value: number, conf?: FNumberConf): string => {
    let _conf: FNumberConf = {
        decimalScale: 2,
        useCommaDecimalSeparator: true,
        showSignal: false,
        ...conf
    }
    
    let signal = _conf.showSignal && value > 0 ? "+" : ""
    let formated = value.toFixed(_conf.decimalScale)
    if (_conf.useCommaDecimalSeparator) formated = formated.replace(".", ",")
    return `${signal}${formated.replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')}`
}

/**
 * 
 *
 * @param {number} value
 * @param {FCurrencyConf} [conf]
 * @returns {string}
 */
export const formatCurrency = (value: number, conf?: FCurrencyConf): string => {
    const _conf: FCurrencyConf = { prefix: "$", ...conf }
    const formattedValue = formatNumber(value, _conf)
    return `${_conf.prefix} ${formattedValue}`
}

/**
 *
 *
 * @param {*} cpf
 * @returns {string}
 */
export const formatCPF = (cpf: any): string => {
    return String(cpf)
        .slice(0, 11)
        .replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, "$1.$2.$3-$4")
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

/**
 *
 *
 * @param {Promise<any>} promise
 * @param {string} error
 * @param {number} [timeout=AppConfig.TIMEOUT]
 * @returns
 */
export const timedPromise = async (promise: Promise<any>, error: string, timeout: number = AppConfig.TIMEOUT): Promise<any> => {
    return Promise.race([
        promise,
        new Promise<any>((_, reject) => setTimeout(() => reject(new Error(error)), timeout))
    ])
}

/**
 *
 *
 * @template T
 * @param {() => void} fn
 * @returns
 */
export const animatedPromise = (fn: () => void) => {
    return new Promise<any>((accept, reject) => requestAnimationFrame(async () => {
        try {
            await fn()
            accept()
        }
        catch(e) {
            reject(e)
            console.error(e)
        }
    }))
}

/**
 * TODO Not good when used with animated buttons.
 *
 * @template T
 * @param {T} callback
 * @param {any[]} [inputs=[]]
 * @returns
 */
export const animatedCallback = <T extends (...args: any[]) => any>(callback: T, inputs: DependencyList = []) => {
    return useCallback((...args) => animatedPromise(() => callback(...args)), inputs)
}

/**
 *
 *
 * @param {() => void} fn
 * @returns
 */
export const useEffectWhenReady = (fn: () => void, unmount?: () => void) => {
    return useEffect(() => {
        const task = InteractionManager.runAfterInteractions(() => fn())
        return () => {
            task.cancel()
            unmount && unmount()
        }
    }, [])
}

/**
 *
 *
 * @param {any[]} first
 * @param {any[]} second
 * @param {("begin" | "end")} position
 * @returns
 */
export const joinArrays = (first: any[], second: any[], position: "begin" | "end") => {
    if (position === "begin") {
        return [...second, ...first]
    }
    return [...first, ...second]
}