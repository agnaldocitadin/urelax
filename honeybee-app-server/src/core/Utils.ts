
import { set } from 'date-fns'

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
        return new Promise(resolve => setTimeout(resolve, ms));
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
        this.id = setTimeout(() => fn(), delay);
    }

    clear() {
        clearTimeout(this.id)
    }

}
