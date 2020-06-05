import { DependencyList, useCallback, useEffect } from 'react'
import { InteractionManager } from 'react-native'

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